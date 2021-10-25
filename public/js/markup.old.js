$(function() {
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
  // hexadecimal encoder/decoder
  henc = function(plain) {
    return plain.split("").map(c => c.charCodeAt(0).toString(16).padStart(2, "0")).join("");
  }
  hdec = function(str) {
    return str.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("");
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
  mylang = window.mylang;
  jsonEscapeUTF = function(s) {
    return s.replace(/[^\x20-\x7F]/g, x => "\\u" + ("000" + x.codePointAt(0).toString(16)).slice(-4))
  }
  ehtml = function(str){
   myvar = DOMPurify.sanitize(str);
   //myvarg = encodeURIComponent(myvar).replace(/[!'()*]/g, function(c) {
   //return '%' + c.charCodeAt(0).toString(16);});
   return myvar;
  }
  //jsonEscapeUTF(JSON.stringify({a:"Привет!"}))
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
  cleartextarea = function(buttonidoftextareatoclear, textareabyname, e) {
    //$( '#'+buttonidoftextareatoclear).on('click', function(e){
    e.preventDefault();
    $('textarea[name="' + textareabyname + '"]').val('');
    //});
  }
  fcreatemarkup = function(idofbuttoncreatemarkup, textareabyname, mrkup, e) {
    //$( '#'+idofbuttoncreatemarkup).on('click', function(e){
    e.preventDefault();

    function getSelectionText() {
      var text = "";
      if (window.getSelection) {
        text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
      }
      return text;
    }
    elementdequestionselectionne = getSelectionText();
    var elementdequestionselectionne = getSelectionText();
    $('textarea[name="' + textareabyname + '"]').val($('textarea[name="' + textareabyname + '"]').val().replace(elementdequestionselectionne, '[' + mrkup + ']' + elementdequestionselectionne + '[/' + mrkup + ']'));
    delete getSelectionText();
    //});
  }
  $(document).on('click', '[id^=Qquestion]', function(e) {
    idQuestion = parseInt(this.id.substring(9));
    //console.log('id numero :'+idQuestion);
    fcreatemarkup('Qquestion' + idQuestion, 'question' + idQuestion, 'Q', e);
  });
  $(document).on('click', '[id^=indice]', function(e) {
    idindice = parseInt(this.id.substring(6));
    //console.log('id numero :'+idindice);
    fcreatemarkup('indice' + idindice, 'question' + idindice, 'I', e);
  });
  $(document).on('click', '[id^=reponsefausse]', function(e) {
    idreponsefausse = parseInt(this.id.substring(13));
    //console.log('id numero :'+idreponsefausse);
    fcreatemarkup('reponsefausse' + idreponsefausse, 'question' + idreponsefausse, 'RF', e);
  });
  $(document).on('click', '[id^=reponsejuste]', function(e) {
    idreponsejuste = parseInt(this.id.substring(12));
    //console.log('id numero :'+idreponsejuste);
    fcreatemarkup('reponsejuste' + idreponsejuste, 'question' + idreponsejuste, 'RJ', e);
  });
  $(document).on('click', '[id^=cleartextarea]', function(e) {
    idcleartextarea = parseInt(this.id.substring(13));
    console.log('id numero :' + idcleartextarea);
    cleartextarea('cleartextarea' + idcleartextarea, 'question' + idcleartextarea, e);
  });
  //fcreatemarkup('Question','question1','Q');
  //fcreatemarkup('indice','question1','I');
  //fcreatemarkup('reponsefausse','question1','RF');
  //fcreatemarkup('reponsejuste','question1','RJ');
  //cleartextarea('cleartextarea','question1');
  //$('.addquestion').on('click', function(event){
  //    event.stopPropagation();
  //    event.stopImmediatePropagation();
  //$('.aflouter').addClass('flou');
  //});
  //fonction de vérification de la durée
  // au chargement du formulaire
  //Fonction troncature
  function trunc(numToTruncate, intDecimalPlaces) {
    var numPower = Math.pow(10, intDecimalPlaces);
    return ~~(numToTruncate * numPower) / numPower;
  }

  function hms2sec(str) {
    var splitedhms = str.split(':'),
      seconds = 0,
      minutes = 1;
    while (splitedhms.length > 0) {
      seconds += minutes * parseInt(splitedhms.pop(), 10);
      minutes *= 60;
    }
    return seconds;
  }
  supprimedoublonscenterednumber = function() {
    var doublonscenterednumbers = {};
    $('[id^=centerednumber]').each(function() {
      if (doublonscenterednumbers.hasOwnProperty(this.id)) {
        $(this).remove();
      } else {
        doublonscenterednumbers[this.id] = 'true';
      }
    });
  }
  recalcultimeautopasauto = function(idselectionnedureeonchange, countmoins1plus1) {
    idselectionnedureeonchange;
    letotaldeladuree = parseInt($('.timing').val());
    addquestionCount = parseInt($('[id^=addquestion]').length);
    if (!isNaN(letotaldeladuree) && addquestionCount > 1) {
      letotaldeladureeformated = new Date(letotaldeladuree * 1000).toISOString().substr(11, 8);
      console.log('debut de fonction recalcul: ' + letotaldeladuree);
      // décompte des questions
      addquestionCount = parseInt($('[id^=addquestion]').length);
      totalnonauto = 0;
      // décompte des question présente qui n'ont pas de auto configuré avec somme cumulative sauf this.id
      $('[id^=timequestionnonauto]:not([disabled])').each(function() {
        //alert('idselectionnedureeonchange: '+idselectionnedureeonchange);
        //alert('this.id: '+this.id);
        if (idselectionnedureeonchange != (this.id)) {
          totalnonauto += hms2sec($('#' + this.id).val());
          console.log('l\'id : ' + this.id + ' est PAS configuré en auto avec une valeur de ' + hms2sec($('#' + this.id).val()) + ' secondes et cumulé :' + totalnonauto);
        }
      });
      // décompte des question qui ont auto configuré et résultat dans 1 array ou objet
      // cree un array avec la liste des id 
      var timequestionautodisabled = [];
      $('[id^=timequestionnonauto]').each(function() {
        if ($('#' + this.id).is(':disabled')) {
          idtimequestionautodisabled = this.id;
          // console.log('l\'id de la durée qui est configurée en auto est  : '+idtimequestionautodisabled);
          timequestionautodisabled.push(idtimequestionautodisabled);
        }
      });
      longueurtimequestionautodisabled = timequestionautodisabled.length;
      console.log('nb de auto' + idselectionnedureeonchange);
      // soustraction timing (total - (décomptepasauto)) / décompte des questions
      console.log('hms2sec($(+idselectionnedureeonchange).val())-----------------' + hms2sec($('#' + idselectionnedureeonchange).val()));
      toutlesnonauto = hms2sec($('#' + idselectionnedureeonchange).val()) + totalnonauto;
      //alert(' toutlesnonauto :---------'+toutlesnonauto) ;
      toutlesnonautoformated = new Date(toutlesnonauto * 1000).toISOString().substr(11, 8);
      if (letotaldeladuree >= toutlesnonauto) {
        dureeautoegaleareecrire = trunc(((letotaldeladuree - (hms2sec($('#' + idselectionnedureeonchange).val())) + totalnonauto)) / (addquestionCount - countmoins1plus1), 0);
        console.log('la duree auto a reecrire : trunc(( ' + letotaldeladuree + ' ::letotaldeladuree - ' + hms2sec($('#' + idselectionnedureeonchange).val()) + '::hms2sec($(this).val())+ ' + totalnonauto + '::totalnonauto)) /' + addquestionCount + ':: addquestionCount - ' + countmoins1plus1 + ' ),0) soit :' + dureeautoegaleareecrire + ' secondes');
        newdureeauto = new Date(dureeautoegaleareecrire * 1000).toISOString().substr(11, 8);
        // réécrit les autotime
        $('[id^=timequestionnonauto]').each(function(index, element) {
          if ($(element).is(":disabled")) {
            newdureeauto = new Date(dureeautoegaleareecrire * 1000).toISOString().substr(11, 8);
            $(element).val(newdureeauto);
          }
        });
      } else {
        var mylang = window.mylang;
        $('.messagemodal').html(langageObject['mots_' + mylang]['messageduree1'] + toutlesnonautoformated + langageObject['mots_' + mylang]['messageduree2'] + letotaldeladureeformated + langageObject['mots_' + mylang]['messageduree3']);
        throwmodal();
      }
      // contrôle de la durée totale pas inférieure à la durée totale de la somme de tout les input timequestionnonauto. 
    } // fin de if isNaN letotaldeladuree
  } // fin de la fonction de recalcul auto ou pas
  // fonction de recalcul du temps des question on.change + conversion duree 00:00:00 en secondes 
  ///////////////////////////////////////////////
  $(document).on('change', '[id^=timequestionnonauto]', function(index, element) {
    idselectionnedureeonchange = this.id;
    countmoins1plus1 = 1;
    recalcultimeautopasauto(idselectionnedureeonchange, countmoins1plus1);
  });
  // algo sur changement checkbox
  $(document).on('change', '[id^=dureequestionauto]', function() {
    iddureequestionautooupas = parseInt(this.id.substring(17));
    iddureeauto = 'timequestionnonauto' + iddureequestionautooupas;
    if ($('#' + this.id).is(':checked')) {
      $('#timequestionnonauto' + iddureequestionautooupas).attr('disabled', true);
      //   console.log('on desactive l\'input '+iddureeauto);
      countmoins1plus1 = 0;
      recalcultimeautopasauto(iddureeauto, countmoins1plus1);
    } else {
      console.log('on reactive l\'input ' + iddureeauto);
      countmoins1plus1 = 1;
      $('#timequestionnonauto' + iddureequestionautooupas).attr('disabled', false);
      recalcultimeautopasauto(iddureeauto, countmoins1plus1);
    }
  });
  //FYI : dureequestionauto est la checkbox et timequestionnonauto est l'input 
  //////////////////////////////////
  $(document).on('change', '.timing', function() {
    letotaldeladuree = parseInt($('.timing').val());
    addquestionCount = parseInt($('[id^=addquestion]').length);
    if (addquestionCount > 1) {
      $('[id^=timequestionnonauto]').each(function() {
        idselectionnedureeonchange = this.id;
        countmoins1plus1 = 0;
        recalcultimeautopasauto(idselectionnedureeonchange, countmoins1plus1);
      });
    } else {
      ladureeformated = new Date(letotaldeladuree * 1000).toISOString().substr(11, 8);
      $('#timequestionnonauto1').val(ladureeformated);
    }
  });
  generatequestionUI = function(classarecupmodif, generatednumberquestion, langageObject) {
    var classarecupmodif;
    var generatednumberquestion;
    // recupere le numero de la question;
    // applique le flou (blur) sur la div sélectionnée 
    $('.aflouter' + classarecupmodif).addClass('flou');
    // créé le numéro de la question id="centerednumber'+classarecupmodif+' au dessus de la zone floutée
    centerednumber = '<div class="centerednumber" id="centerednumber' + classarecupmodif + '">' + classarecupmodif + '</div>';
    $('.questionpan' + classarecupmodif).append(centerednumber);
    $('.questionpan' + classarecupmodif).css({
      'width': '100%',
      'height': '100%',
      'margin': 'auto',
      'position': 'relative'
    });
    $('#centerednumber' + classarecupmodif).removeClass('flou');
    // lorsque la souris passe sur la div aflouter, alors le centerednumber s'affiche/se masque
    //$('.aflouter'+classarecupmodif).hover(
    var mylang = window.mylang;
    addtext = '';
    addtext += '<div class="questionpan' + generatednumberquestion + '">';
    addtext += '<hr>';
    addtext += '<div class="aflouter' + generatednumberquestion + '" id="aflouter' + generatednumberquestion + '">';
    addtext += '   <label class="fieldlabelsquestion"><span class="lang-questionx0">' + langageObject['mots_' + mylang]['questionx0'] + '&nbsp; </span>' + generatednumberquestion + '</label> <input type="hidden"  class="form-control"  name="numeroquestion" /> ';
    addtext += '   <label class="lang-dureequestions fieldlabels">' + langageObject['mots_' + mylang]['dureequestions'] + '</label> ';
    addtext += '   <div class="splitteddiv">';
    addtext += '      <div class="column50">';
    addtext += '         <div class="creauti">';
    addtext += '            <label class="switch">';
    addtext += '            <input type="checkbox" name="dureequestionauto' + generatednumberquestion + '" id="dureequestionauto' + generatednumberquestion + '" checked>';
    addtext += '            <span class="slider round"></span></label>';
    addtext += '            <span class="fieldlabels" style="margin-left:1em;line-height:2em;">Auto</span>';
    addtext += '         </div>';
    addtext += '      </div>';
    addtext += '      <div class="column50">';
    addtext += '         <input type="time" id="timequestionnonauto' + generatednumberquestion + '" min="0:00:00" max="0:59:59" step="2" class="ignore" value="00:00:00" disabled>';
    addtext += '      </div>';
    addtext += '   </div>';
    addtext += '   <label class="lang-questionindicelabel fieldlabels">' + langageObject['mots_' + mylang]['questionindicelabel'] + '</label>';
    addtext += '   <div class="pdquiz text-center">';
    addtext += '      <!-- debut quiz -->';
    addtext += '      <div id="widget" class="ta">';
    addtext += '         <div id="overlay" style="padding-right: 0.5em;">';
    addtext += '            <button class="action-button" id="cleartextarea' + generatednumberquestion + '">X</button>                           ';
    addtext += '            <button class="lang-indicebutton action-button" id="indice' + generatednumberquestion + '">' + langageObject['mots_' + mylang]['indicebutton'] + '</button>';
    addtext += '            <button class="action-button" id="reponsejuste' + generatednumberquestion + '">[RJ]</button>';
    addtext += '            <button class="action-button" id="reponsefausse' + generatednumberquestion + '">[RF]</button>';
    addtext += '            <button class="action-button" id="Qquestion' + generatednumberquestion + '">Q</button>';
    addtext += '         </div>';
    addtext += '         <textarea name="question' + generatednumberquestion + '" id="question' + generatednumberquestion + '" class="lang-question1textarea form-control ta textareafullquestion' + generatednumberquestion + '" placeholder="' + langageObject['mots_' + mylang]['question1textarea'] + '" required="" rows="5" cols="33" maxlength="1000"></textarea>';
    addtext += '      </div>';
    addtext += '   </div>';
    addtext += '   <!-- fin quiz -->';
    addtext += '   <!-- debut de image question -->';
    addtext += '   <div class="form-wrapper" style="margin-bottom:4em;text-align:left;">';
    addtext += '      <label class="lang-imagedelaquestionlabel fieldlabels">' + langageObject['mots_' + mylang]['imagedelaquestionlabel'] + '</label> ';
    addtext += '      <div style="margin:auto;">';
    addtext += '         <div>';
    addtext += '            <label for="image_uploads' + generatednumberquestion + '" class="lang-selectionimagepresentation label_imagedepresentation action-button-login" id="imageuploadform' + generatednumberquestion + '">' + langageObject['mots_' + mylang]['selectionimagepresentation'] + '</label>';
    addtext += '            <input type="file" id="image_uploads' + generatednumberquestion + '" name="image_uploads' + generatednumberquestion + '" accept=".jpg, .jpeg, .png" class="iu iux' + generatednumberquestion + '" id="iux' + generatednumberquestion + '" hidden />';
    addtext += '                 <input type="hidden" id="b64imagedepresentation' + generatednumberquestion + '" value="" />';
    addtext += '         </div>';
    addtext += '         <div class="preview_imagedepresentation formimagedepresentation preview_imagedepresentationx' + generatednumberquestion + '" id="preview_imagedepresentationx' + generatednumberquestion + '">';
    addtext += '            <p class="lang-nofileselectedimagedepresentation">' + langageObject['mots_' + mylang]['nofileselectedimagedepresentation'] + '</p>';
    addtext += '         </div>';
    addtext += '         <div>';
    addtext += '            <!--<button class="action-button-upload uploadimagequestion' + generatednumberquestion + '" style="margin-bottom:2em;">Uploader</button>-->';
    addtext += '         </div>';
    addtext += '      </div>';
    addtext += '   </div>';
    addtext += '</div>                                     ';
    addtext += '<!-- fin div class aflouter -->';
    addtext += '';
    addtext += '                             ';
    addtext += '                         <div style="width:100%;display:flex;justify-content: space-between" class="addremovequestionbutton">';
    addtext += '                           <input type="button" name="addquestion' + generatednumberquestion + '" id="addquestion' + generatednumberquestion + '" class="action-button addquestion' + generatednumberquestion + '" value="+" /> ';
    addtext += '                           <input type="button" name="removequestion' + generatednumberquestion + '" id="removequestion' + generatednumberquestion + '" class="action-button removequestion' + generatednumberquestion + '" value="-" /> ';
    addtext += '                   						</div>   ';
    addtext += '                         </div>'
    addtext += '   <!-- fin de questionpan -->    ';
    $('.questionpancontainer').append(addtext);
  };
  // Small modal
  throwmodal = function() {
    // When the user clicks on the button, open the modal
    $('#myModal').css({
      'display': 'block'
    });
    $(".close").click(function() {
      $('#myModal').css({
        'display': 'none'
      });
    });
    window.onclick = function(event) {
      if (event.target == $('#myModal')) {
        $('#myModal').css({
          'display': 'none'
        });
      }
    }
  }
  i = 1;
  generatednumberquestion = 0;
  // évenement lors de l'ajout de la question
  $(document).on('click', '[id^=addquestion]', function(mylang) {
    addquestionCount = parseInt($('[id^=addquestion]').length);
    classarecupmodif = parseInt(this.id.substring(11));
    if (classarecupmodif == addquestionCount) {
      generatednumberquestion = addquestionCount + 1;
      generatequestionUI(classarecupmodif, generatednumberquestion, langageObject);
      $('html, body').animate({
        scrollTop: parseInt($('.questionpan' + generatednumberquestion).offset().top)
      }, 600);
      modifnumberquestion = classarecupmodif;
      $('#centerednumber' + modifnumberquestion).hide();
      idselectionnedureeonchange = 'timequestionnonauto' + generatednumberquestion;
      countmoins1plus1 = 0;
      recalcultimeautopasauto(idselectionnedureeonchange, countmoins1plus1);
      supprimedoublonscenterednumber();
    window.loadsTongue(window.mylang);
    } else {
      var mylang = window.mylang;
      $('.messagemodal').html(langageObject['mots_' + mylang]['messageordrecroissant']);
      throwmodal();
      return false;
    }
  });
  // evenement lors de la suppression de la question
  $(document).on('click', '[id^=removequestion]', function() {
    classrmarecupmodif = parseInt(this.id.substring(14));
    removequestionCount = parseInt($('[id^=removequestion]').length);
    if (classrmarecupmodif == removequestionCount && classrmarecupmodif > 1) {
      $('.questionpan' + classrmarecupmodif).remove();
      //modif l'affichage du nombre de questions
      modifnumberquestion = parseInt(classrmarecupmodif) - 1;
      $('html, body').animate({
        scrollTop: parseInt($('.questionpan' + modifnumberquestion).offset().top)
      }, 600);
      supprimedoublonscenterednumber();
      idselectionnedureeonchange = 'timequestionnonauto' + modifnumberquestion;
      countmoins1plus1 = 0;
      recalcultimeautopasauto(idselectionnedureeonchange, countmoins1plus1);
    } else {
      var mylang = window.mylang;
      $('.messagemodal').html(langageObject['mots_' + mylang]['messageordredecroissant']);
      throwmodal();
      return false;
    }
  });
  verifiecontentquestion = function(questioncontent, uniddequestion, langageObject) {
    var mylang = window.mylang;
    $('.messagemodal').html(langageObject['mots_' + mylang]['messagequestionparse1'] + uniddequestion + langageObject['mots_' + mylang]['messagequestionparse2']);
    throwmodal();
    return false;
  }
  // au click de la step2 on charge les images
  $(document).on('click', '.next2', function() {
    quizobject = {};
    allquestionsarray = [];
    errorflagstep2 = 0;
    //console.log('transfert de fonction object questionsimageob reussi' + questionsimageob[0]);
    $('[id^=b64imagedepresentation]').each(function() {
      idofimage = parseInt(this.id.substring(22));
      getbdui2 = $('#b64imagedepresentation' + idofimage).val();
      if ((typeof getbdui2 === 'undefined' || getbdui2 == '') && idofimage != 0) {
        questionsimageob[idofimage] = dummy_step2;
        //console.log('image ' + idofimage + ' step2 pas trouvé ' + questionsimageob[idofimage]);
      } else {
        if (idofimage != 0 && getbdui2 != '') {
          questionsimageob[idofimage] = getbdui2;
          // console.log('image step2 trouvé format data:url  : ' + getbdui2);
        }
      }
    });
    $.each(questionsimageob, function(index, value) {
      // console.log(index + ": " + value);
      // $('body').append('	<img src="'+value+'" width="100%" height="100%" />');
    });
    //on récupère les données de quiz dans les questions 
    // ! Doit contenir les balises [Q][/Q] [RJ][/RJ] [RF][/RF]
    // ! Si plusieurs  [RJ][/RJ] alors QCM
    // ! Si [I][/I] alors indice présent
    $('[id^="question"]').each(function() {
      typequiz = 'qa';
      reponsefausseobj = {};
      reponsejusteobj = {};
      finalidQuestion = parseInt(this.id.substring(8));
      questioncontent = $('#question' + finalidQuestion).val();
      if (typeof questioncontent != 'undefined' && (questioncontent.match(/(\[Q\][^\[]*\[\/Q\])/g) != null) && (questioncontent.match(/(\[RJ\][^\[]*\[\/RJ\])/g) != null) && (questioncontent.match(/(\[RF\][^\[]*\[\/RF\])/g) != null)) {
        questioncontent = $('#question' + finalidQuestion).val();
        console.log('question ' + finalidQuestion + ' content : ' + questioncontent + ' ');
        questiontag = questioncontent.match(/(\[Q\][^\[]*\[\/Q\])/g);
        reponsejustetag = questioncontent.match(/(\[RJ\][^\[]*\[\/RJ\])/g);
        reponsefaussetag = questioncontent.match(/(\[RF\][^\[]*\[\/RF\])/g);
        if (questiontag.length > 0 && reponsejustetag.length > 0 && reponsefaussetag.length > 0 && (typeof questiontag.toString() != 'undefined' && questiontag.toString().slice(3, -4) != '') && (typeof reponsejustetag.toString() != 'undefined' && reponsejustetag.toString().slice(4, -5) != '') && (typeof reponsefaussetag.toString() != 'undefined' && reponsefaussetag.toString().slice(4, -5) != '')) {
          questiontagparsed = questiontag.toString().slice(3, -4);
          console.log('la question a ete trouvee :' + questiontagparsed);
          // boucle les réponses fausses
          rf = 0;
          for (rf = 0; rf < reponsefaussetag.length; rf++) {
            reponsefaussetagparsed = reponsefaussetag[rf].slice(4, -5);
            reponsefausseobj[rf] = reponsefaussetagparsed;
            rfcount = rf + 1;
            console.log('la réponse fausse [' + rfcount + '/' + reponsefaussetag.length + '] a ete trouvee :' + reponsefaussetagparsed);
          }
          // boucle les réponses justes 
          // si plusieurs réponses juste alors QCM
          rj = 0;
          rjarray = [];
          for (rj = 0; rj < reponsejustetag.length; rj++) {
            if (reponsejustetag.length > 1) {
              typequiz = 'qcm';
            }
            rjcount = rj + 1;
            reponsejustetagparsed = reponsejustetag[rj].toString().slice(4, -5);
            reponsejusteobj[rj] = reponsejustetagparsed;
            console.log('la réponse juste [' + rjcount + '/' + reponsejustetag.length + '] a ete trouvee :' + reponsejustetagparsed);
          }
          if (questioncontent.match(/(\[I\][^\[]*\[\/I\])/g) != null && questioncontent.match(/(\[I\][^\[]*\[\/I\])/g).length > 0 && typeof questioncontent.match(/(\[I\][^\[]*\[\/I\])/g).toString() != 'undefined' && questioncontent.match(/(\[I\][^\[]*\[\/I\])/g).toString().slice(3, -4) != '') {
            indicetag = questioncontent.match(/(\[I\][^\[]*\[\/I\])/g);
            indicetagparsed = indicetag.toString().slice(3, -4);
            indice = indicetagparsed;
          } else {
            indice = 'no';
          }
          //console.log('Indice : ' + indice);
          //console.log('Le quiz numero ' + finalidQuestion + '  est un ' + typequiz);
          // ajout en objet le quiz
          // questionnumero question, reponsejuste, reponsefausse,indice,dureequestion,dureequestionsec,typequiz
          if ($('#timequestionnonauto' + finalidQuestion).val() != '00:00:00') {
            timequestionsec = new Date('1970-01-01T' + $('#timequestionnonauto' + finalidQuestion).val() + 'Z').getTime() / 1000;
          } else {
            timequestionsec = '\u221e';
          }
          questionobject = {
            'questionnumero': finalidQuestion,
            'typequiz': typequiz,
            'timequestion': DOMPurify.sanitize($('#timequestionnonauto' + finalidQuestion).val()),
            'timequestionsec': DOMPurify.sanitize(timequestionsec),
            'laquestion': DOMPurify.sanitize(questiontagparsed),
            'reponsesjuste': reponsejusteobj,
            'reponsesfausse': reponsefausseobj,
            'indice': DOMPurify.sanitize(indice),
            'imagequestion': DOMPurify.sanitize(questionsimageob[finalidQuestion]),
            'questioncontent': DOMPurify.sanitize(questioncontent)
          };
          console.log(questionobject);
          allquestionsarray.push(questionobject);
        }
      } else {
        errorflagstep2 = 1;
        verifiecontentquestion(questioncontent, finalidQuestion, langageObject);
        return false;
      }
    });
    // récupere dans l'object les entrées suivantes : 
    //intitule, description, tagsinput,timing, youtubeurl, categorie, nombrequestion,image
    if ($('#timing').val() == '') {
      timingval = '\u221e';
    } else {
      timingval = $('#timing').val();
    }
    quizobject = {
      'lang': window.mylang,
      'intitule': ehtml($('#intitule').val()),
      'description': ehtml($('#description').val()),
      'tagsinput': $('#tagsinput').val(),
      'timing': ehtml(timingval),
      'youtubeurl': ehtml($('#youtubeurl').val()),
      'categorie': ehtml($('#categorie').val()),
      'nombrequestions': parseInt($('[id^=addquestion]').length),
      'imagepresentation': questionsimageob[0],
      'allquestions': allquestionsarray
    };
    //console.log(quizobject);
    uname = JSON.parse(localStorage.getItem('userinfo')).uname;
    timestamp = Date.now();
    rid = timestamp + '_' + window.rn + '_' + uname;
    randomid = henc(rid);
    //console.log('random id trouvé : '+rid+' et le uname '+uname);
    //console.log('random id trouvé : '+randomid);
    theurl = '/quiz/' + randomid;
    //console.log('test infini : ' + JSON.stringify(quizobject));
    $.ajax({
      xhr: function() {
	console.log('request started');
    var xhr = new window.XMLHttpRequest();
    //Upload progress
    xhr.upload.addEventListener("progress", function(evt){
      if (evt.lengthComputable) {
		var percentComplete = evt.loaded / evt.total;
		var pcwrite =  Math.round(percentComplete * 100);
		$('.loadingquizimage').html(pcwrite + '%');
      }
    }, false);
    //Download progress
    xhr.addEventListener("progress", function(evt){
      if (evt.lengthComputable) {
        var percentComplete = evt.loaded / evt.total;
		var pcwrite =  Math.round(percentComplete * 100);
		$('.loadingquizimage').html(pcwrite + '%');
        console.log(percentComplete);
      }
    }, false);
    return xhr;
  },
      url: theurl,
      type: "POST",
      dataType: "json",
      data: JSON.stringify(quizobject),
      contentType: "application/json",
      cache: false,
      //  timeout: 999999999,
      complete: function(data) {
        //called when complete
        console.log('quiz enregistré avec succès');
        successanim = '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">';
        successanim += '                       <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />';
        successanim += '                       <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />';
        successanim += '                     </svg>';
        successanim += '                 <div class="lang-success success" style="font-size:3em; text-align:center;color:#006DBF;">Enregistré</div>';
        $('.success-animation').html(successanim);
        window.loadsTongue(mylang);
      },
      success: function(data) {
        allquiz = JSON.stringify(data);
        quizo = JSON.stringify(quizobject);
        // console.log('quizobject '+theurl+randomid+' transfered !\n\n');
        // console.log('allquiz data :\n '+allquiz);
         s_a = '<div class="loadingquizimage" style="font-size:3em; text-align:center;color:#006DBF;"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#009DBF;" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">';
		 s_a +='    <rect x="0" y="13" width="4" height="5" fill="#333">';
		 s_a +='      <animate attributeName="height" attributeType="XML"';
		 s_a +='        values="5;21;5" ';
		 s_a +='        begin="0s" dur="0.6s" repeatCount="indefinite" />';
		 s_a +='      <animate attributeName="y" attributeType="XML"';
		 s_a +='        values="13; 5; 13"';
		 s_a +='        begin="0s" dur="0.6s" repeatCount="indefinite" />';
		 s_a +='    </rect>';
		 s_a +='    <rect x="10" y="13" width="4" height="5" fill="#333">';
		 s_a +='      <animate attributeName="height" attributeType="XML"';
		 s_a +='        values="5;21;5" ';
		 s_a +='        begin="0.15s" dur="0.6s" repeatCount="indefinite" />';
		 s_a +='      <animate attributeName="y" attributeType="XML"';
		 s_a +='        values="13; 5; 13"';
		 s_a +='        begin="0.15s" dur="0.6s" repeatCount="indefinite" />';
		 s_a +='    </rect>';
		 s_a +='    <rect x="20" y="13" width="4" height="5" fill="#333">';
		 s_a +='      <animate attributeName="height" attributeType="XML"';
		 s_a +='        values="5;21;5" ';
		 s_a +='        begin="0.3s" dur="0.6s" repeatCount="indefinite" />';
		 s_a +='      <animate attributeName="y" attributeType="XML"';
		 s_a +='        values="13; 5; 13"';
		 s_a +='        begin="0.3s" dur="0.6s" repeatCount="indefinite" />';
		 s_a +='    </rect>';
		 s_a +='  </svg>';
		 s_a +='  </svg></div>';
		$('.success-animation').html(s_a);
         console.log('quizobject : \n'+quizo);
      },
      error: function() {
        console.log('erreur lors de la sauvegarde du quiz à distance');
      }
    });
    //        $.ajax({
    //                url:theurl,
    //                type: "POST",
    //                dataType: "json",
    //                data: jsonEscapeUTF(JSON.stringify(quizobject)),
    //                contentType: "application/json",
    //                cache: false,
    //                timeout: 5000,
    //                complete: function(data) {
    //                  //called when complete
    //                  console.log('enregistrement du quiz');
    //                },
    //                success: function(data) {
    //				 allquiz = JSON.stringify(data);
    //				 quizo = JSON.stringify(quizobject);
    //                 // console.log('quizobject '+theurl+randomid+' transfered !\n\n');
    //                 // console.log('allquiz data :\n '+allquiz);
    //                 // console.log('quizobject : \n'+quizo);
    //               },
    //                error: function() {
    //                  console.log('erreur lors de la sauvegarde du quiz à distance');
    //                },
    //              });    
    // Changement de step fieldset au clique de next2
    if (errorflagstep2 != 1) {
      var current_fs, next_fs, previous_fs; //fieldsets
      var opacity;
      var current = 2;
      var steps = $("fieldset").length;
      setProgressBar = function(curStep) {
        var percent = parseFloat(100 / steps) * curStep;
        percent = percent.toFixed();
        $(".progress-bar").css("width", percent + "%")
      }
      current_fs = $('#fs2');
      next_fs = $('#fs3');
      //console.log('id du prochain fs : ' + next_fs.id);
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
      next_fs.show();
      current_fs.animate({
        opacity: 0
      }, {
        step: function(now) {
          opacity = 1 - now;
          current_fs.css({
            'display': 'none',
            'position': 'relative'
          });
          next_fs.css({
            'opacity': opacity
          });
        },
        duration: 500
      });
      setProgressBar(++current);
      writequestion(quizobject);
    }
    // fin de changement de fieldset au click de la step
  });
  // affichage de next3 final enregistrement
  $(document).on('click', '.next3', function() {
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 2;
    var steps = $("fieldset").length;
    setProgressBar = function(curStep) {
      var percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();
      $(".progress-bar").css("width", percent + "%")
    }
    current_fs = $('#fs3');
    next_fs = $('#fs4');
    console.log('id du prochain fs : ' + next_fs.id);
    if(typeof next_fs.id == 'undefined'){
    $(".progress-bar").css("width", "100%");
    }
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    next_fs.show();
    current_fs.animate({
      opacity: 0
    }, {
      step: function(now) {
        opacity = 1 - now;
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        next_fs.css({
          'opacity': opacity
        });
      },
      duration: 500
    });
  });
  // bouton prévious
  $(document).on('click', '.previous2', function() {
    var current_fs, next_fs, previous_fs; //fieldsets
    var opacity;
    var current = 2;
    var steps = $("fieldset").length;
    setProgressBar = function(curStep) {
      var percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();
      $(".progress-bar").css("width", percent + "%")
    }
    current_fs = $('#fs2');
    previous_fs = $('#fs1');
    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function(now) {
        // for making fielset appear animation
        opacity = 1 - now;
        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        previous_fs.css({
          'opacity': opacity
        });
      },
      duration: 500
    });
    setProgressBar(--current);
  });
  //fin bouton previous
  // affiche supprime le numero de la question par dessus le flou
  $(document).on('mouseenter', '[id^="aflouter"]', function() {
    aflouternumber = parseInt(this.id.substring(8));
    if ($('#centerednumber' + this.id.substring(8)).length && this.id.substring(8) !== 1) {
      aflouternumber = parseInt(this.id.substring(8));
      $('#centerednumber' + aflouternumber).hide();
    } else {
      aflouternumber = parseInt(this.id.substring(8));
      $('#centerednumber' + aflouternumber).hide();
    }
  }).on('mouseleave', '[id^=aflouter]', function() {
    aflouternumber = parseInt(this.id.substring(8));
    if ($('[id^=addquestion]').length > 1) {
      $('[id^="centerednumber"]').show();
    } else {
      $('[id^="centerednumber"]').hide();
    }
  });
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
        clearInterval(interval);
      });
      $(document).on('click', '#boutonreloadquizbasdepage', function() {
        clearInterval(interval);
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
      idbpquestionaverif = parseInt(this.id.substring(28));
      questionquizmoinsun = idbpquestionaverif - 1;
      if (idbpquestionaverif > 1) {
        $(bpid).addClass('colorblue');
        $('#quizq' + idbpquestionaverif).hide();
        $('#conteneurcolonnesquizbasdepage' + idbpquestionaverif).hide();
        $('#quizq' + questionquizmoinsun).show();
        $('#conteneurcolonnesquizbasdepage' + questionquizmoinsun).show();
      }
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
        var mylang = window.mylang;
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
        var mylang = window.mylang;
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
        resquiztableau += '                 <br>';
        resquiztableau += '                 <hr>';
        resquiztableau += '                </div> ';
        $('#' + idquiztableauresultats).html(resquiztableau);
        //console.log('censer cacher #quizq'+idquestionaverif);
        setTimeout(function() {
          $('#quizq' + idquestionaverif).hide();
          $('#conteneurcolonnesquizbasdepage' + idquestionaverif).hide();
        }, 2000);
        //tableau d'affichage des résultats
        //console.log(resultatvraifaux);
        //    resultatvraifaux[idquestionaverif] = ['Échec',arus,arjs]; 
        resquiztableaur = '';
        letableauderesultat = $('#resquiztableau')
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
        letableauderesultat.html(resquiztableaur);
        window.loadsTongue(mylang);
        qcount = $('[id^=boutonsuivantquizbasdepage]').length;
        totalcorrectmsg = langageObject['mots_' + mylang]['totalcorrect'] + ' ' + lesreponsesjustes + '/' + qcount;
        $('#totalCorrect').html(totalcorrectmsg);
        $('#textecentralquizbasdepage' + nombredequestionquizplusun).html(lesreponsesjustes + '/' + nombredequestionquiz);
        $('#quizq' + nombredequestionquizplusun).show();
        $('#' + idquiztableauresultats).show();
        $('#conteneurcolonnesquizbasdepage' + nombredequestionquizplusun).show();
        // nettoie le tableau des résultats
        //for(xyz=1;xyz<=resultatvraifaux.length;xyz++){
        // resultatvraifaux[xyz]=null;
        //}
        $('#boutonreloadquizbasdepage').on('click', function(e) {
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
        console.log('La question : ' + obj.questionnumero + '/' + nombredequestionquiz + ' d\'une durée de ' + obj.timequestion + ' soit ' + obj.timequestionsec + 's');
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
        quizqcm1 += '                    ' + decodeURIComponent(obj.laquestion);
        quizqcm1 += '                    <div class="indicequestionquiz">';
        // si indice : on affiche
        tehhint = obj.indice.replace(/&#([0-9]+);/g, function(full, int) {
          return String.fromCharCode(parseInt(int));
        });
        if (tehhint != 'no') {
          lindice = 'Indice : ' + obj.indice;
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
          quizqcm += '                   <span class="radio_lbl">' + knum + '. ' + decodeURIComponent(arrayreponses[obj.questionnumero][k][0]) + '</span>';
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
        if ((parseInt(obj.timequestionsec) == 0) || (obj.timequestionsec == '\u221e') || (obj.timequestionsec == '?')) {
          $('#coltopquiztime' + obj.questionnumero).html('\u221e');
        }
        if (obj.questionnumero == 1 && (parseInt(obj.timequestionsec) != 0 && obj.timequestionsec != '\u221e' && obj.timequestionsec != '?')) {
          console.log('timequestion seconde est pas infini ' + obj.timequestionsec + '       \u221e');
          console.log('configure le temps 1ere question : ' + obj.questionnumero + ' detectee ' + parseInt(obj.timequestionsec) + ' validé');
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
        console.log('question numero :' + obj.questionnumero + ' typequiz : ' + monquiz.allquestions[ahminus]["typequiz"] + ' minus = ' + ahminus);
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
        tehhint = obj.indice.replace(/&#([0-9]+);/g, function(full, int) {
          return String.fromCharCode(parseInt(int));
        });
        // si indice : on affiche
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
          quizqa += '                    <span class="radio_lbl">' + knum + '. ' + DOMPurify.sanitize(arrayreponses[obj.questionnumero][k][0]) + '</span>';
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
        if (obj.questionnumero == 1 && (parseInt(obj.timequestionsec) != 0 || obj.timequestionsec != '\u221e' || obj.timequestionsec != '?')) {
          tempspremierequestion(arrayreponses, monquiz, arrayreponsesjustes, arrayreponsesutilisateur, resultatvraifaux, '#coltopquiztime1');
        }
        //  fin TIMER
        ////////////////////////////////////////////////////////
        $('#quizq' + obj.questionnumero).css("display", setdisplay);
        $('#conteneurcolonnesquizbasdepage' + obj.questionnumero).css("display", setdisplay);
        //console.log('voila '+quizqa1+quizqa+quizqa2);
        imageurl = obj.imagequestion;
        console.log('rajout de l\'image :' + imageurl);
        $('#container_imagequiz' + obj.questionnumero).css("background-image", "url(" + imageurl + ")");
        //    $('#container_imagequiz' + obj.questionnumero).html(' <img src="' + imageurl + '" style="width:100%;height:100%;margin:auto;vertical-align:middle;" />');
        idimg = '#container_imagequiz' + obj.questionnumero;
        console.log(idimg + ' id et le texte de limage : ' + $(idimg).text());
      } // fin de if qcm /QA
      window.loadsTongue(mylang);
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
  }
window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};
}); // fin de fonction de chargement de la page
