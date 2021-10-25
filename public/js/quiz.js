$(function() {
 var mylang = JSON.parse(localStorage['lang'] || 'defaultValue');
  jQuery.extend({
    compare: function(a, b) {
      var obj_str = '[object Object]',
        arr_str = '[object Array]',
        a_type = Object.prototype.toString.apply(a),
        b_type = Object.prototype.toString.apply(b);
      if (a_type !== b_type) {
        return false;
      } else if (a_type === obj_str) {
        return $.compareObject(a, b);
      } else if (a_type === arr_str) {
        return $.compareArray(a, b);
      }
      return (a === b);
    }
  });
  jQuery.extend({
    compareArray: function(arrayA, arrayB) {
      var a, b, i, a_type, b_type;
      // References to each other?
      if (arrayA === arrayB) {
        return true;
      }
      if (arrayA.length != arrayB.length) {
        return false;
      }
      // sort modifies original array
      // (which are passed by reference to our method!)
      // so clone the arrays before sorting
      a = jQuery.extend(true, [], arrayA);
      b = jQuery.extend(true, [], arrayB);
      a.sort();
      b.sort();
      for (i = 0, l = a.length; i < l; i += 1) {
        a_type = Object.prototype.toString.apply(a[i]);
        b_type = Object.prototype.toString.apply(b[i]);
        if (a_type !== b_type) {
          return false;
        }
        if ($.compare(a[i], b[i]) === false) {
          return false;
        }
      }
      return true;
    }
  });
  jQuery.extend({
    compareObject: function(objA, objB) {
      var i, a_type, b_type;
      // Compare if they are references to each other 
      if (objA === objB) {
        return true;
      }
      if (Object.keys(objA).length !== Object.keys(objB).length) {
        return false;
      }
      for (i in objA) {
        if (objA.hasOwnProperty(i)) {
          if (typeof objB[i] === 'undefined') {
            return false;
          } else {
            a_type = Object.prototype.toString.apply(objA[i]);
            b_type = Object.prototype.toString.apply(objB[i]);
            if (a_type !== b_type) {
              return false;
            }
          }
        }
        if ($.compare(objA[i], objB[i]) === false) {
          return false;
        }
      }
      return true;
    }
  });
  hdec = function(str) {
    return str.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("");
  }
  decentities = function(str) {
    str.replace(/&#([0-9]+);/g, function(full, int) {
      return String.fromCharCode(parseInt(int));
    });
  }
  ehtml = function(str){
  myvar = DOMPurify.sanitize(str);
  return myvar;
  }
  ehtml2 = function(str) {
    if (typeof(str) == "string") {
      try {
        var newStr = "";
        var nextCode = 0;
        for (var i = 0; i < str.length; i++) {
          nextCode = str.charCodeAt(i);
          if (nextCode > 0 && nextCode < 128) {
            newStr += "&#" + nextCode + ";";
          } else {
            newStr += "?";
          }
        }
        return newStr;
      } catch (err) {}
    } else {
      return str;
    }
  }
  // Durstenfeld shuffle algorithm 
  shuffle = function(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  toHHMMSS = function(str) {
    var sec_num = parseInt(str, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
  }
  jsonEscapeUTF = function(s) {
    return s.replace(/[^\x20-\x7F]/g, x => "\\u" + ("000" + x.codePointAt(0).toString(16)).slice(-4))
  }
  //console.log('quiz trouvé :');
  //console.log(hdec(window.myobjh));
  //function jsonEscapeUTF(s) {return s.replace(/[^\x20-\x7F]/g, x => "\\u" + ("000"+x.codePointAt(0).toString(16)).slice(-4))}
  //jsonEscapeUTF(JSON.stringify({a:"test"}))
  console.log(' décodé : '+decodeURIComponent(unescape(myobjh)));
  myobj = JSON.parse(unescape(decodeURIComponent(unescape(myobjh)));
  //myobj = JSON.parse(window.myobjh);
  send_quizresults = function(resultquiz, myobj) {
    quizid = myobj.imagepresentation.replace('imagepresentation/', '');
    titrequiz = myobj.intitule;
    privkey = JSON.parse(localStorage.getItem('userinfo')).privkey;
    uname = JSON.parse(localStorage.getItem('userinfo')).uname;
    timestamp = Date.now();
    arrresults = {
      'timestamp': timestamp,
      'intitule': titrequiz,
      'id': quizid,
      'resultats': resultquiz,
      'uname': uname
    };
    console.log('json généré');
    console.log(arrresults);
    theurl = '/saveresults/' + quizid + '/key/' + privkey + '/name/' + uname;
    $.ajax({
      url: theurl,
      type: "POST",
      dataType: "json",
      data: jsonEscapeUTF(JSON.stringify(arrresults)),
      contentType: "application/json",
      cache: false,
      complete: function(data) {
        //called when complete
        console.log('enregistrement des résultats du quiz');
      },
      success: function(data) {
        resultssaved = JSON.stringify(data);
        console.log('résultats sauvegardés ' + resultssaved);
      },
      error: function() {
        console.log('erreur lors de la sauvegarde du résultat du quiz à distance');
      },
    });
  }
  ////////////////////////////////////////////////////////////////////////////////////////////
  // début du chargement des quiz
  // tasklist
  // ! si pas de réponse on rempli le résultat a 0
  // ! rétablir les checkbox lors du re-chargement 
  // ! empecher le double clic
  tempspremierequestion = function(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, idtimer) {
    // idtimer = '#coltopquiztime1';
    if (idtimer == '#coltopquiztime1') {
      thisid = 'boutonsuivantquizbasdepage1';
    } else {
      thisid = 'boutonsuivantquizbasdepage' + parseInt(idtimer.substring(15));
    }
    intervalissetflag = 0;
    //\u221e
    if ($(idtimer).html() !== '\u221e' && $(idtimer).html() !== '?') {
      //console.log('temps pas infini: '+$(idtimer).html());
      intervalissetflag = 1;
      interval = setInterval(function() {
        $(idtimer).each(function() {
          var seconds = $(idtimer).data('seconds');
          if (seconds > 0) {
            second = seconds - 1;
            $(idtimer).data('seconds', second);
            var date = new Date(null);
            date.setSeconds(second);
            $(idtimer).html(date.toISOString().substr(11, 8))
          } else {
            $(idtimer).html('00:00:00');
            clearInterval(interval);
            verifquestion(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, thisid, langageObject);
          }
        });
      }, 1000);
      interval;
      $(document).on('click', '[id^=boutonsuivantquizbasdepage]', function() {
        clearInterval(interval);
      });
      $(document).on('click', '[id^=boutonprecedentquizbasdepage]', function() {
        //clearInterval(interval);
      });
      $(document).on('click', '#boutonreloadquizbasdepage', function() {
        //clearInterval(interval);
        document.location='/q'+quizid;
      });
    } else {
      if (typeof interval !== 'undefined') {
        clearInterval(interval);
        intervalissetflag = 0;
      }
    }
  }
  boutonrestart = function(myobj) {
    // $(document).on('click', '#boutonreloadquizbasdepage', function() {
    //writequestion.stopPropagation(); 
    // force reset
    monquiz = null;
    arrayreponses = null;
    arrayreponsesjustes = null;
    arrayreponsesutilisateur = null;
    resultatvraifaux = null;
    qaqcm = null;
    idcheckboxlbl = '[id^=checkboxlbl_quiz_]';
    $(idcheckboxlbl).attr('style', 'color: #006dbf;');
    idradiolbl = '[id^=radiolbl_quiz_]';
    $(idradiolbl).attr('style', 'color: #006dbf;');
    $('[id^=quizq]').remove();
    $('.conteneurcolonnesquizbasdepage').remove();
    $('.quizcontainer').html('');
    writequestion(myobj);
  }
  boutonprecedent = function() {
    $(document).on('click', '[id^=boutonprecedentquizbasdepage]', function() {
      bpid = '#' + this.id;
    // dé-commentez pour activer le passage à la page précédente
    //  idbpquestionaverif = parseInt(this.id.substring(28));
    //  questionquizmoinsun = idbpquestionaverif - 1;
    //  if (idbpquestionaverif > 1) {
    //    $(bpid).addClass('colorblue');
    //    $('#quizq' + idbpquestionaverif).hide();
    //    $('#conteneurcolonnesquizbasdepage' + idbpquestionaverif).hide();
    //    $('#quizq' + questionquizmoinsun).show();
    //    $('#conteneurcolonnesquizbasdepage' + questionquizmoinsun).show();
    //  }
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  verifquestion = function(qaqcm, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, thisid, langageObject) {
    nombredequestionquiz = parseInt(monquiz['nombrequestions']);
    //empèche le doubleclic
    $('#' + thisid).prop("disabled", true);
    setTimeout(() => {
      $('#' + thisid).prop("disabled", false);
    }, 2000);
    idquestionaverif = parseInt(thisid.substring(26));
    if (idquestionaverif > nombredequestionquiz) {
      //console.log('idquestionaverif : '+idquestionaverif+' est superieur au nombre de question '+nombredequestionquiz);
      idquestionaverif = 1;
    }
    //change la couleur du bouton precedent
    numform = idquestionaverif - 1;
    questiontype = monquiz['allquestions'][numform]['typequiz'];
    duree = monquiz['allquestions'][numform]['timequestion'];
    dureesec = monquiz['allquestions'][numform]['timequestionsec'];
    if ($('#quizq' + idquestionaverif).is(':visible')) {
      if (idquestionaverif > 1) {
        $('#boutonprecedentquizbasdepage' + idquestionaverif).addClass('colorblue');
      }
      //algorithme sur le temps: si le temps est infini impossible de revenir en arriere avec le bouton précédent-- non retenu
      // si la durée n'est pas finie alors on autorise les suivant précédent jusqu'a la longueur du quiz en mettant en pause le temps actuel --non retenu
      // !si la question est un qcm alors vérifie les checkbox
      //console.log('traitement de la question type : '+monquiz['allquestions'][numform]['typequiz']);
      if (monquiz['allquestions'][numform]['typequiz'] == 'qcm') {
        //console.log('la question '+idquestionaverif+' est un '+questiontype+'  | qa qcm : '+qaqcm);
        // boucle pour chaque réponses dans la question
        for (l = 0; l < qaqcm[idquestionaverif].length; l++) {
          lnum = l + 1;
          // vérification de la correspondance du tableau des réponses avec la question
          if (qaqcm[idquestionaverif][l][2] == idquestionaverif) {
            // console.log('reponse '+lnum+' : '+qaqcm[idquestionaverif][l][0]+' '+qaqcm[idquestionaverif][l][1]);
            // $('input:checkbox:(:checked)').each( function() {
            //});
            // récupération de l'id de la checkbox
            idcheckbox = '#checkbox_quiz_' + qaqcm[idquestionaverif][l][2] + '_' + lnum;
            idcheckboxlbl = '#checkboxlbl_quiz_' + qaqcm[idquestionaverif][l][2] + '_' + lnum;
            idtextecentralquizbasdepage = '#textecentralquizbasdepage' + qaqcm[idquestionaverif][l][2];
            //console.log(idcheckbox);
            if (qaqcm[idquestionaverif][l][1] == 'juste') {
              arrayreponsesjustes[idquestionaverif].push(lnum);
            }
            if (qaqcm[idquestionaverif][l][1] == 'juste' && $(idcheckbox).is(':checked')) {
              // console.log('reponse checkée juste : '+lnum+' : '+qaqcm[idquestionaverif][l][0]+' '+qaqcm[idquestionaverif][l][1]);
              // $(idcheckboxlbl).attr('style','color: #65ff65;'); 
              //  $(idtextecentralquizbasdepage).attr('style','color: #65ff65;'); 
              arrayreponsesutilisateur[idquestionaverif].push(lnum);
            } else if (qaqcm[idquestionaverif][l][1] = 'fausse' && $(idcheckbox).is(':checked')) {
              //console.log('reponse checkée fausse change couleur : '+lnum+' : '+qaqcm[idquestionaverif][l][0]+' '+qaqcm[idquestionaverif][l][1]);
              //  $(idcheckboxlbl).attr('style','color: #ff0000;'); 
              //  $(idtextecentralquizbasdepage).attr('style','color: #ff0000;'); 
              arrayreponsesutilisateur[idquestionaverif].push(lnum);
            } else {
              if (arrayreponsesjustes[idquestionaverif].includes(lnum)) {
                //console.log('reponse pas checkées  : '+lnum+' : '+qaqcm[idquestionaverif][l][0]+' '+qaqcm[idquestionaverif][l][1]);
                //$(idcheckboxlbl).attr('style','color: #ff0000;'); 
                //$(idtextecentralquizbasdepage).attr('style','color: #ff0000;'); 
                arrayreponsesutilisateur[idquestionaverif].push(0);
              }
            }
          }
        }
        // vérifie si les réponses justes sont les memes données par l'utilisateur
        idcheckboxlbl = '[id^=checkboxlbl_quiz_]';
        $(idcheckboxlbl).attr('style', 'color: #006dbf;');
        idradiolbl = '[id^=radiolbl_quiz_]';
        $(idradiolbl).attr('style', 'color: #006dbf;');
        var mylang = JSON.parse(localStorage['lang'] || 'defaultValue');
        arjs1 = [...new Set(arrayreponsesjustes[idquestionaverif])].sort();
        arus1 = [...new Set(arrayreponsesutilisateur[idquestionaverif])].sort();
        if ($.compare(arjs1, arus1) === true) {
          resultatvraifaux[idquestionaverif] = ['Succès', arus1, arjs1];
          var testar = 0;
          for (testar = 0; testar < arjs1.length; testar++) {
            idcheckboxlbl = '#checkboxlbl_quiz_' + idquestionaverif + '_' + arjs1[testar];
            $(idcheckboxlbl).attr('style', 'color: #65ff65;');
          }
          $(idtextecentralquizbasdepage).attr('style', 'color: #65ff65;');
          $(idtextecentralquizbasdepage).html('Bravo');
        } else {
          if (typeof arus1 == 'undefined') {
            resultatvraifaux[idquestionaverif] = ['Échec', [0], arjs1];
          } else {
            resultatvraifaux[idquestionaverif] = ['Échec', arus1, arjs1];
          }
          $(idtextecentralquizbasdepage).attr('style', 'color: #ff0000;');
          $(idtextecentralquizbasdepage).html('Oops');
          var testar2 = 0;
          for (testar2 = 0; testar2 < arus1.length; testar2++) {
            idcheckboxlbl = '#checkboxlbl_quiz_' + idquestionaverif + '_' + arus1[testar2];
            $(idcheckboxlbl).attr('style', 'color: #ff0000;');
          }
          var testar = 0;
          for (testar = 0; testar < arjs1.length; testar++) {
            idcheckboxlbl = '#checkboxlbl_quiz_' + idquestionaverif + '_' + arjs1[testar];
            $(idcheckboxlbl).attr('style', 'color: #65ff65;');
          }
        }
      }
      if (monquiz['allquestions'][numform]['typequiz'] == 'qa') {
        // boucle pour chaque réponses dans la question
        for (m = 0; m < qaqcm[idquestionaverif].length; m++) {
          mnum = m + 1;
          // vérification de la correspondance du tableau des réponses avec la question
          if (qaqcm[idquestionaverif][m][2] == idquestionaverif) {
            idradioinput = '#radioinput_quiz_' + qaqcm[idquestionaverif][m][2] + '_' + mnum;
            idradiolbl = '#radiolbl_quiz_' + qaqcm[idquestionaverif][m][2] + '_' + mnum;
            idtextecentralquizbasdepage = '#textecentralquizbasdepage' + qaqcm[idquestionaverif][m][2];
            //console.log(idradioinput);
            if (qaqcm[idquestionaverif][m][1] == 'juste') {
              arrayreponsesjustes[idquestionaverif].push(mnum);
            }
            if (qaqcm[idquestionaverif][m][1] == 'juste' && $(idradioinput).is(':checked')) {
              //console.log('reponse checkée juste : '+mnum+' : '+qaqcm[idquestionaverif][m][0]+' '+qaqcm[idquestionaverif][m][1]);
              //$(idradiolbl).attr('style','color: #65ff65;'); 
              //$(idtextecentralquizbasdepage).attr('style','color: #65ff65;'); 
              arrayreponsesutilisateur[idquestionaverif].push(mnum);
            } else if (qaqcm[idquestionaverif][m][1] = 'fausse' && $(idradioinput).is(':checked')) {
              //console.log('reponse checkée fausse change couleur : '+mnum+' : '+qaqcm[idquestionaverif][m][0]+' '+qaqcm[idquestionaverif][m][1]);
              //$(idradiolbl).attr('style','color: #ff0000;'); 
              //$(idtextecentralquizbasdepage).attr('style','color: #ff0000;'); 
              arrayreponsesutilisateur[idquestionaverif].push(mnum);
            } else {
              if (arrayreponsesjustes[idquestionaverif].includes(mnum)) {
                //console.log('reponse pas checkées  : '+lnum+' : '+qaqcm[idquestionaverif][m][0]+' '+qaqcm[idquestionaverif][m][1]);
                //$(idradiolbl).attr('style','color: #ff0000;'); 
                //$(idtextecentralquizbasdepage).attr('style','color: #ff0000;'); 
                arrayreponsesutilisateur[idquestionaverif].push(0);
              }
            }
          }
        }
        // vérifie si les réponses justes sont les memes données par l'utilisateur
        // enleve les doublons
        idcheckboxlbl = '[id^=checkboxlbl_quiz_]';
        $(idcheckboxlbl).attr('style', 'color: #006dbf;');
        idradiolbl = '[id^=radiolbl_quiz_]';
        $(idradiolbl).attr('style', 'color: #006dbf;');
        arjs2 = [...new Set(arrayreponsesjustes[idquestionaverif])].sort();
        arus2 = [...new Set(arrayreponsesutilisateur[idquestionaverif])].sort();
        if ($.compare(arjs2, arus2) === true) {
          resultatvraifaux[idquestionaverif] = ['Succès', arus2, arjs2];
          var testar = 0;
          for (testar = 0; testar < arjs2.length; testar++) {
            idradiolbl = '#radiolbl_quiz_' + idquestionaverif + '_' + arjs2[testar];
            $(idradiolbl).attr('style', 'color: #65ff65;');
          }
          $(idtextecentralquizbasdepage).attr('style', 'color: #65ff65;');
          $(idtextecentralquizbasdepage).html('Bravo');
        } else {
          if (typeof arus2 == 'undefined') {
            resultatvraifaux[idquestionaverif] = ['Échec', [0], arjs2];
          } else {
            resultatvraifaux[idquestionaverif] = ['Échec', arus2, arjs2];
          }
          $(idtextecentralquizbasdepage).attr('style', 'color: #ff0000;');
          $(idtextecentralquizbasdepage).html('Oops');
          var testar = 0;
          for (testar = 0; testar < arjs2.length; testar++) {
            idradiolbl = '#radiolbl_quiz_' + idquestionaverif + '_' + arjs2[testar];
            $(idradiolbl).attr('style', 'color: #65ff65;');
          }
          var testar2 = 0;
          for (testar2 = 0; testar2 < arus2.length; testar2++) {
            idradiolbl = '#radiolbl_quiz_' + idquestionaverif + '_' + arus2[testar2];
            $(idradiolbl).attr('style', 'color: #ff0000;');
          }
        }
      } // fin de if quiz qcm qa
      idpagequivantequiz = parseInt(idquestionaverif) + 1;
      // si on est pas en derniere page on va a la page suivante sinon on affiche les résultats.
      if (idpagequivantequiz <= nombredequestionquiz) {
        setTimeout(function() {
          $('#quizq' + idquestionaverif).hide();
          $('#conteneurcolonnesquizbasdepage' + idquestionaverif).hide();
          $('#quizq' + idpagequivantequiz).show();
          $('#conteneurcolonnesquizbasdepage' + idpagequivantequiz).show();
        }, 2000);
      } else {
        /////////////////////////////////
        // affiche les résultats
        /////////////////////////////////
        var mylang = JSON.parse(localStorage['lang'] || 'defaultValue');
        retakeflag = 1;
        nombredequestionquizplusun = nombredequestionquiz + 1;
        //définit l'id du tableau des résultats
        idquiztableauresultats = 'quizq' + nombredequestionquizplusun;
        //console.log('censé affiché les résultat dans #'+idquiztableauresultats);
        //pour l'affichage des résultats finaux
        resquiztableau = '             <div class="form-wrapper">';
        resquiztableau += '               <div id="result-of-question" class="pulse animated" style="">';
        resquiztableau += '              <span id="totalCorrect" class="lang-totalcorrect pull-right">Total Correct ?</span>';
        resquiztableau += '               <table class="table table-sm">';
        resquiztableau += '                <thead>';
        resquiztableau += '                  <tr>';
        resquiztableau += '                    <th scope="col">#</th>';
        resquiztableau += '                    <th scope="col" class="lang-reponsesjustes">Réponses justes</th>';
        resquiztableau += '                    <th scope="col" class="lang-vosreponses">Vos réponses</th>';
        resquiztableau += '                    <th scope="col" class="lang-resultat">Résultats</th>';
        resquiztableau += '                  </tr>';
        resquiztableau += '                </thead>';
        resquiztableau += '                <tbody id="resquiztableau">';
        //fin boucle affichage tableau résultats
        resquiztableau += '                </tbody>';
        resquiztableau += '              </table>               ';
        resquiztableau += '                </div>';
        resquiztableau += '<hr>';
        resquiztableau += '<div class="trophyornottrophy"><span class="fa fa-trophy" style="color:#fffb00; font-size:6em;"></span></div>';         
        resquiztableau += '<h4>'+window.langageObject['mots_'+mylang]['evaluezlequiz']+'</h4>';
        resquiztableau += '<div class="ratingcontainer">';       
        resquiztableau += '				 <div class="rate">';
        resquiztableau += '					<input type="radio" id="starz5" name="rate" value="5" />';
        resquiztableau += '					<label for="starz5" title="text">5 stars</label>';
        resquiztableau += '					<input type="radio" id="starz4" name="rate" value="4" />';
        resquiztableau += '					<label for="starz4" title="text">4 stars</label>';
        resquiztableau += '					<input type="radio" id="starz3" name="rate" value="3" />';
        resquiztableau += '					<label for="starz3" title="text">3 stars</label>';
        resquiztableau += '					<input type="radio" id="starz2" name="rate" value="2" />';
        resquiztableau += '					<label for="starz2" title="text">2 stars</label>';
        resquiztableau += '					<input type="radio" id="starz1" name="rate" value="1" />';
        resquiztableau += '					<label for="starz1" title="text">1 star</label>';
        resquiztableau += '				  </div>';
        resquiztableau += ' </div>';
        resquiztableau += '                 <br>';
        resquiztableau += '                 <hr>';
        resquiztableau += '                </div> ';
        //console.log('censer cacher #quizq'+idquestionaverif);
        $('#' + idquiztableauresultats).css('display','none');
		$('#' + idquiztableauresultats).html(resquiztableau);
		
        setTimeout(function() {
          $('#quizq' + idquestionaverif).hide();
          $('#conteneurcolonnesquizbasdepage' + idquestionaverif).hide();
        }, 3000);
		//$(resquiztableau).appendTo('#' + idquiztableauresultats).delay(3000);
        //$('#' + idquiztableauresultats).html(resquiztableau);

        //---------------------------------------------------------------------
        // important modification effectuee au dessus du timeout
        //$(resquiztableau).appendTo('#' + idquiztableauresultats).delay(3000);
        //$('#' + idquiztableauresultats).append(resquiztableau);

        //tableau d'affichage des résultats
        //console.log(resultatvraifaux);
        //    resultatvraifaux[idquestionaverif] = ['Échec',arus,arjs]; 
        resquiztableaur = '';
        letableauderesultat = $('#resquiztableau');
        letableauderesultat.html('');
        lesreponsesjustes = 0;
        for (z = 1; z <= resultatvraifaux.length; z++) {
          if (typeof resultatvraifaux[z] !== 'undefined') {
            if (resultatvraifaux[z][0] == 'Succès') {
              lesreponsesjustes += 1;
            } else {
              resultatvraifaux[z][0] == 'Érreur';
            }
            //  console.log('resultatvraifaux[z] '+resultatvraifaux[z]);
            //  console.log('resultatvraifaux[z][0] '+resultatvraifaux[z][0]);
            //  console.log('resultatvraifaux[z][1] '+resultatvraifaux[z][1]);
            //  console.log('resultatvraifaux[z][2] '+resultatvraifaux[z][2]);
            resquiztableaur += '                  <tr>';
            resquiztableaur += '                    <th scope="row">' + z + '</th>';
            resquiztableaur += '                    <td>' + resultatvraifaux[z][2].toString() + '</td>';
            resquiztableaur += '                    <td>' + resultatvraifaux[z][1].toString() + '</td>';
            resquiztableaur += '                    <td>' + resultatvraifaux[z][0].toString() + '</td>';
            resquiztableaur += '                  </tr>';
          } // finde if resultatvraifaux[z] is defined
        }
        //-------------------------------------------------
        // colonne en bas de page avec les résultats
		// $(resquiztableaur).appendTo(letableauderesultat).delay(3000);
        letableauderesultat.html(resquiztableaur);


        qcount = $('[id^=boutonsuivantquizbasdepage]').length;
        rslt = lesreponsesjustes + '/' + qcount;
        totalcorrectmsg = langageObject['mots_' + mylang]['totalcorrect'] + ' ' + rslt;
        $('#totalCorrect').text(totalcorrectmsg);
        send_quizresults(rslt, myobj);
        $('#textecentralquizbasdepage' + nombredequestionquizplusun).html(lesreponsesjustes + '/' + nombredequestionquiz);
        setTimeout(function() {
        $('#quizq' + nombredequestionquizplusun).show();
        $('#' + idquiztableauresultats).show();
        $('#' + idquiztableauresultats).show();
        $('#conteneurcolonnesquizbasdepage' + nombredequestionquizplusun).show();
        //Si toute les réponses sont juste on affiche les confettis
        if(parseInt(lesreponsesjustes) ==parseInt(nombredequestionquiz)){
		$('.trophyornottrophy').show('slow');
		}
        }, 3000);
        
        //-----------------------------------------

        // nettoie le tableau des résultats
        //for(xyz=1;xyz<=resultatvraifaux.length;xyz++){
        // resultatvraifaux[xyz]=null;
        //}
        $('#boutonreloadquizbasdepage').on('click', function(e) {
		 $('.trophyornottrophy').css('display','none');
          boutonrestart(monquiz);
        });
        ////////////////////////////////
        /// Fin affichage des résultats
        ///////////////////////////////
      }
    } else {
      return false;
    } // fin de if is visible
    //});//fin de document onclick
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  writequestion = function(monquiz) {
    retakeflag = 0;
    //Fonction dans fonction
    //function verif les réponses suivant
    $('[id^=quizq]').remove();
    $('.conteneurcolonnesquizbasdepage').remove();
    $('.quizcontainer').html('');
    //$(quizid).remove();
    nombredequestionquiz = parseInt(monquiz['nombrequestions']);
    nombredequestionquizplusun = nombredequestionquiz + 1;
    arrayreponses = [];
    arrayreponsesjustes = [];
    arrayreponsesutilisateur = [];
    resultatvraifaux = [];
    // préparation des résultats
    resquiztableau1 = '<div id="quizq' + nombredequestionquizplusun + '" style="display:none;"></div>'
    resquiztableau1 += '               <div class="conteneurcolonnesquizbasdepage" id="conteneurcolonnesquizbasdepage' + nombredequestionquizplusun + '"  style="display:none;">';
    resquiztableau1 += '                 <div class="columnquizbasdepage">';
    resquiztableau1 += '                 <div class="boutonprecedentquizbasdepage" id="boutonprecedentquizbasdepage' + nombredequestionquizplusun + '"><</div>';
    resquiztableau1 += '                 </div>';
    resquiztableau1 += '                 <div class="columnquizbasdepage">';
    resquiztableau1 += '                   <div class="textecentralquizbasdepage" id="textecentralquizbasdepage' + nombredequestionquizplusun + '">X/X</div>';
    resquiztableau1 += '                 </div>';
    resquiztableau1 += '                 <div class="columnquizbasdepage">';
    //↻
    resquiztableau1 += '                 <div class="boutonsuivantquizbasdepage" id="boutonreloadquizbasdepage">↻</div>';
    resquiztableau1 += '                 </div>';
    resquiztableau1 += '               </div>  ';
    $('.quizcontainer').html(resquiztableau1);
    xy = 0;
    for (var key in monquiz.allquestions) {
      xy++;
      var obj = monquiz.allquestions[key];
      arrayreponses[obj.questionnumero] = [];
      arrayreponsesjustes[obj.questionnumero] = [];
      arrayreponsesutilisateur[obj.questionnumero] = [];
      resultatvraifaux[obj.questionnumero] = [];
      setdisplay = 'block';
      if (obj.questionnumero != '1') {
        setdisplay = 'none';
      }
      ahminus = xy - 1;
      ah = monquiz.allquestions[ahminus]["typequiz"];
      //alert('type quiz cliké '+obj.typequiz+' pour la question numero '+obj.questionnumero+' ah :'+ah+' xy '+xy);
      if (ah == 'qcm') {
        //console.log('question numero '+obj.questionnumero+' | type quiz : '+obj.typequiz+' | la question : '+obj.laquestion+' | la réponse juste '+obj.reponsesjuste[0]+' | length '+Object.keys(obj.reponsesjuste).length);
        // console.log('La question : ' + obj.questionnumero + '/' + nombredequestionquiz + ' d\'une durée de ' + obj.timequestion + ' soit ' + obj.timequestionsec + 's');
        ////////////////////////////////////
        //quiz qcm :
        // ecrit les questions
        quizqcm1 = '<div id="quizq' + obj.questionnumero + '">';
        quizqcm1 += '                   <div class="containerimgquiz">';
        quizqcm1 += '                     <div class="container_image" id="container_imagequiz' + obj.questionnumero + '"></div>';
        quizqcm1 += '                    </div>                            ';
        quizqcm1 += '                    <!-- debut de form wrapper -->';
        quizqcm1 += '                  <div class="form-wrapper">';
        quizqcm1 += '                  <div class="coltopquiz">';
        quizqcm1 += '                    <div class="colonnequiztop">';
        quizqcm1 += '                      <div class="quiznumeroquestion">question ' + obj.questionnumero + '/' + nombredequestionquiz + '</div>';
        quizqcm1 += '                    </div>';
        quizqcm1 += '                    <div class="colonnequiztop">';
        quizqcm1 += '                      <div style="text-align:right;" class="coltopquiztime" id="coltopquiztime' + obj.questionnumero + '" data-seconds="' + parseInt(obj.timequestionsec) + '">' + obj.timequestion + '</div>';
        quizqcm1 += '                    </div>';
        quizqcm1 += '                  </div>';
        quizqcm1 += '                   <div class="questionquiz" id="questionquiz' + obj.questionnumero + '">';
        quizqcm1 += '                    ' + obj.laquestion;
        quizqcm1 += '                    <div class="indicequestionquiz">';
        // si indice : on affiche
        tehhint = obj.indice.replace(/&#([0-9]+);/g, function(full, int) {
          return String.fromCharCode(parseInt(int));
        });
        if (tehhint !== 'no') {
          lindice = 'Indice : ' + obj.indice.replace(/&#([0-9]+);/g, function(full, int) {
            return String.fromCharCode(parseInt(int));
          });
        } else {
          lindice = '';
        }
        quizqcm1 += '                     ' + lindice;
        quizqcm1 += '                    </div>';
        quizqcm1 += '                  </div>';
        // boucle réponses justes
        for (i = 0; i < Object.keys(obj.reponsesjuste).length; i++) {
          arrayreponses[obj.questionnumero].push([obj.reponsesjuste[i], 'juste', obj.questionnumero]);
        }
        // boucle réponses fausses
        for (j = 0; j < Object.keys(obj.reponsesfausse).length; j++) {
          arrayreponses[obj.questionnumero].push([obj.reponsesfausse[j], 'fausse', obj.questionnumero]);
        }
        // randomnize les réponses
        quizqcm = ''
        shuffle(arrayreponses[obj.questionnumero]);
        for (k = 0; k < arrayreponses[obj.questionnumero].length; k++) {
          knum = k + 1;
          quizqcm += '                 <label class="checkbox" id="checkboxlbl_quiz_' + obj.questionnumero + '_' + knum + '" style="color:#006DBF;">';
          quizqcm += '                   <span class="checkbox__input">';
          quizqcm += '                  <input type="checkbox" name="checkbox" id="checkbox_quiz_' + obj.questionnumero + '_' + knum + '" style="color:#006DBF;">';
          quizqcm += '                  <span class="checkbox__control">';
          quizqcm += '                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">';
          quizqcm += '                   <path fill="none" stroke="currentColor" stroke-width="3" d="M1.73 12.91l6.37 6.37L22.79 4.59" /></svg>';
          quizqcm += '                  </span>';
          quizqcm += '                   </span>';
          quizqcm += '                   <span class="radio_lbl">' + knum + '. ' + ehtml(arrayreponses[obj.questionnumero][k][0]) + '</span>';
          quizqcm += '                 </label>';
          //console.log('Réponses '+knum+': '+arrayreponses[k][0]+' | '+arrayreponses[k][1]);
        }
        quizqcm2 = '                 <br>';
        quizqcm2 += '                 <hr>';
        quizqcm2 += '                </div>   ';
        quizqcm2 = '</div>'; //fin de quizqx
        quizqcm2 += '                 <hr>';
        quizqcm2 += '               <div class="conteneurcolonnesquizbasdepage" id="conteneurcolonnesquizbasdepage' + obj.questionnumero + '">';
        quizqcm2 += '                 <div class="columnquizbasdepage">';
        quizqcm2 += '                 <div class="boutonprecedentquizbasdepage" id="boutonprecedentquizbasdepage' + obj.questionnumero + '"><</div>';
        quizqcm2 += '                 </div>';
        quizqcm2 += '                 <div class="columnquizbasdepage">';
        quizqcm2 += '                   <div class="textecentralquizbasdepage" id="textecentralquizbasdepage' + obj.questionnumero + '">Quiz</div>';
        quizqcm2 += '                 </div>';
        quizqcm2 += '                 <div class="columnquizbasdepage">';
        quizqcm2 += '                 <div class="boutonsuivantquizbasdepage" id="boutonsuivantquizbasdepage' + obj.questionnumero + '">></div>';
        quizqcm2 += '                 </div>';
        quizqcm2 += '               </div>  ';
        $('.quizcontainer').append(quizqcm1 + quizqcm + quizqcm2);
        //////////////////////////////////////////
        // Configuration timer pour éviter les doublons configurer la fonction en dehors de writequestion()
        // si une des durées est = 0;alors le temps question est \u221e
        if ((parseInt(obj.timequestionsec) == 0) || (obj.timequestionsec == '\u221e' || obj.timequestionsec == '?')) {
          $('#coltopquiztime' + obj.questionnumero).html('\u221e');
        }
        if (obj.questionnumero == 1 && (parseInt(obj.timequestionsec) !== 0 || (obj.timequestionsec !== '\u221e' && obj.timequestionsec !== '?'))) {
          //  console.log('timequestion seconde est pas infini ' + obj.timequestionsec + '       \u221e');
          //  console.log('configure le temps 1ere question : ' + obj.questionnumero + ' detectee ' + parseInt(obj.timequestionsec) + ' validé');
          tempspremierequestion(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, '#coltopquiztime1');
        }
        //     fin timer
        ///////////////////////////////////////////
        $('#quizq' + obj.questionnumero).css('display', setdisplay);
        $('#conteneurcolonnesquizbasdepage' + obj.questionnumero).css('display', setdisplay);
        //console.log('voila '+quizqcm1+quizqcm+quizqcm2);
        imageurl = obj.imagequestion;
        $('#container_imagequiz' + obj.questionnumero).css("background-image", "url(" + imageurl + ")");
        // $('#container_imagequiz' + obj.questionnumero).html(' <img src="' + imageurl + '" style="width:100%;height:100%;margin:auto;vertical-align:middle;" />');
        idimg = '#container_imagequiz' + obj.questionnumero;
      }
      if (ah == 'qa') {
        /////////////////////////
        // Quiz QA
        tqs = obj.timequestionsec;
        //console.log('question numero :' + obj.questionnumero + ' typequiz : ' + monquiz.allquestions[ahminus]["typequiz"] + ' minus = ' + ahminus);
        quizqa1 = '<div id="quizq' + obj.questionnumero + '">';
        quizqa1 += '                   <div class="containerimgquiz">';
        quizqa1 += '                     <div class="container_image" id="container_imagequiz' + obj.questionnumero + '"></div>';
        quizqa1 += '                    </div>                            ';
        quizqa1 += '                  <div class="form-wrapper">';
        quizqa1 += '                  <div class="coltopquiz">';
        quizqa1 += '                    <div class="colonnequiztop">';
        quizqa1 += '                      <div class="quiznumeroquestion">question ' + obj.questionnumero + '/' + nombredequestionquiz + '</div>';
        quizqa1 += '                    </div>';
        quizqa1 += '                    <div class="colonnequiztop">';
        quizqa1 += '                      <div style="text-align:right;" class="coltopquiztime" id="coltopquiztime' + obj.questionnumero + '" data-seconds="' + parseInt(obj.timequestionsec) + '">' + obj.timequestion + '</div>';
        quizqa1 += '                    </div>';
        quizqa1 += '                  </div>';
        quizqa1 += '                   <div class="questionquiz" id="questionquiz' + obj.questionnumero + '">';
        quizqa1 += '                    ' + obj.laquestion;
        quizqa1 += '                    <div class="indicequestionquiz">';
        // si indice : on affiche
        tehhint = obj.indice.replace(/&#([0-9]+);/g, function(full, int) {
          return String.fromCharCode(parseInt(int));
        });
        if (tehhint != 'no') {
          lindice = 'Indice : ' + obj.indice;
        } else {
          lindice = '';
        }
        quizqa1 += '                     ' + lindice;
        quizqa1 += '                    </div>';
        quizqa1 += '                  </div>';
        // boucle réponses justes
        for (i = 0; i < Object.keys(obj.reponsesjuste).length; i++) {
          arrayreponses[obj.questionnumero].push([obj.reponsesjuste[i], 'juste', obj.questionnumero]);
        }
        // boucle réponses fausses
        for (j = 0; j < Object.keys(obj.reponsesfausse).length; j++) {
          arrayreponses[obj.questionnumero].push([obj.reponsesfausse[j], 'fausse', obj.questionnumero]);
        }
        // randomnize les réponses
        quizqa = ''
        shuffle(arrayreponses[obj.questionnumero]);
        for (k = 0; k < arrayreponses[obj.questionnumero].length; k++) {
          knum = k + 1;
          quizqa += '                  <label class="radio radio-before" id="radiolbl_quiz_' + obj.questionnumero + '_' + knum + '" style="color:#006DBF;">';
          quizqa += '                    <span class="radio__input">';
          quizqa += '                   <input type="radio" name="radio" id="radioinput_quiz_' + obj.questionnumero + '_' + knum + '" style="color:#006DBF;">';
          quizqa += '                   <span class="radio__control"></span>';
          quizqa += '                    </span>';
          quizqa += '                    <span class="radio_lbl">' + knum + '. ' + ehtml(arrayreponses[obj.questionnumero][k][0]) + '</span>';
          quizqa += '                  </label>';
          //console.log('Réponses '+knum+': '+arrayreponses[k][0]+' | '+arrayreponses[k][1]);
        }
        quizqa2 = '                 <br>';
        quizqa2 += '                 <hr>';
        quizqa2 += '                </div>   ';
        quizqa2 = '</div>'; //fin de quizqx
        quizqa2 += '                 <hr>';
        quizqa2 += '               <div class="conteneurcolonnesquizbasdepage" id="conteneurcolonnesquizbasdepage' + obj.questionnumero + '">';
        quizqa2 += '                 <div class="columnquizbasdepage">';
        quizqa2 += '                 <div class="boutonprecedentquizbasdepage" id="boutonprecedentquizbasdepage' + obj.questionnumero + '"><</div>';
        quizqa2 += '                 </div>';
        quizqa2 += '                 <div class="columnquizbasdepage">';
        quizqa2 += '                   <div class="textecentralquizbasdepage" id="textecentralquizbasdepage' + obj.questionnumero + '">Quiz</div>';
        quizqa2 += '                 </div>';
        quizqa2 += '                 <div class="columnquizbasdepage">';
        quizqa2 += '                 <div class="boutonsuivantquizbasdepage" id="boutonsuivantquizbasdepage' + obj.questionnumero + '">></div>';
        quizqa2 += '                 </div>';
        quizqa2 += '               </div>  ';
        $('.quizcontainer').append(quizqa1 + quizqa + quizqa2);
        //////////////////////////////////////////////////////////
        // TIMER
        // si une des durées est = 0;alors le temps question est \u221e
        if (parseInt(obj.timequestionsec) == 0 || obj.timequestionsec == '\u221e' || obj.timequestionsec == '?') {
          $('#coltopquiztime' + obj.questionnumero).html('\u221e');
        }
        if (obj.questionnumero == 1 && (parseInt(obj.timequestionsec) !== 0 || obj.timequestionsec !== '\u221e' && obj.timequestionsec !== '?')) {
          tempspremierequestion(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, '#coltopquiztime1');
        }
        //  fin TIMER
        ////////////////////////////////////////////////////////
        $('#quizq' + obj.questionnumero).css("display", setdisplay);
        $('#conteneurcolonnesquizbasdepage' + obj.questionnumero).css("display", setdisplay);
        //console.log('voila '+quizqa1+quizqa+quizqa2);
        imageurl = obj.imagequestion;
        //console.log('rajout de l\'image :' + imageurl);
        //$('#container_imagequiz' + obj.questionnumero).attr('style', 'background-image:url(../'+imageurl+');');
        $('#container_imagequiz' + obj.questionnumero).css('background-image', 'url(../' + imageurl + ')');
        //alert('#container_imagequiz' + obj.questionnumero + ' image : ../'+imageurl);
        //$('#container_imagequiz' + obj.questionnumero).html(' <img src="../' + imageurl + '" style="width:100%;height:100%;margin:auto;vertical-align:middle;border-radius:2rem;" />');
        idimg = '#container_imagequiz' + obj.questionnumero;
        // console.log(idimg + ' id et le texte de limage : ' + $(idimg).text());
      } // fin de if qcm /QA
    }
    $(document).on('click', '[id^=boutonsuivantquizbasdepage]', function() {
      thisid = this.id;
      idquestionaverif = parseInt(thisid.substring(26));
      idquestionaverifsuivant = idquestionaverif + 1;
      idtimer = '#coltopquiztime' + idquestionaverifsuivant;
      seconds = parseInt($(idtimer).data('seconds'));
      //si data sec est superieur a 1 et que   coltopquiztime+1 de idquestionaverif est inférieur ou égal au nombre total de question
      if ((seconds > 1) && (nombredequestionquiz <= idquestionaverifsuivant)) {
        verifquestion(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, thisid, langageObject);
        tempspremierequestion(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, idtimer);
      } else {
        verifquestion(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, thisid, langageObject);
      }
    });
    boutonprecedent();
  loadsTongue(mylang);
  }

  $("#fs2").hide();
  $(document).on('click', '.play-button', function(e) {
    $("#fs1").hide();
    $("#fs2").show();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    writequestion(myobj);
  });
  async function addstars(uname, privkey, quizid, score) {
//	app.get('/star/add/:quizid/name/:uname/key/:privkey', async (req,res) => {
    thestarurl = '/star/add/' + quizid + '/name/' + uname + '/key/' + privkey + '/note/'+parseInt(score);
    $.ajax({
      url: thestarurl,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      cache: false,
      complete: function(data) {
        //called when complete
      },
      success: function(data) {
        console.log(data);
	
	  },
      error: function(data) {
        showresults = {
          "error": "nothing to show"
        };
        console.log(showresults);
      }
    });
}
  $(document).on('click', '[id^=starz]', function(e) {
	score=parseInt(this.id.substring(5));
	privkey = JSON.parse(localStorage.getItem('userinfo')).privkey.toString();
    uname = JSON.parse(localStorage.getItem('userinfo')).uname.toString();
    //console.log(score+' étoiles '+ '/star/add/' + quizid + '/name/' + uname + '/key/' + privkey + '/note/'+parseInt(score));
    addstars(uname,privkey,quizid,score);	
  });
  
});
