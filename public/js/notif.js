$(function() {
  verif_chemin = window.location.pathname;
  chknotiflocation = verif_chemin.substring(verif_chemin.lastIndexOf("/") + 1, verif_chemin.length);
  if (chknotiflocation == 'mynotifications') {
    snotifobject = {
      'count': 0,
      'timec': Date.now()
    };
    $('.badge').html('0');
    $('.badge').css('display', 'none');
    localStorage.setItem('notif', JSON.stringify(snotifobject));
  }
  $(document).on('click', '.notification', function() {
    thecount = {
      'count': '0',
      'timec': Date.now()
    };
    localStorage.setItem('notif', JSON.stringify(thecount));
    $('.badge').html('0');
    $('.badge').css('display', 'none');
    document.location = 'mynotifications';
  });
  getallnotifstatus = function ganstatus(startpoint, limit, privkey, uname) {
    if (typeof startpoint == 'undefined') {
      startpoint = 0;
    }
    theurl = '/getnotif/api/' + privkey + '/user/' + uname + '/' + parseInt(startpoint) + '/' + limit;
    thenewcountfound = 0;
    $.ajax({
      url: theurl,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      cache: false,
      complete: function(data) {
        //called when complete
      },
      success: function(data) {
        //console.log(data);
        data.reverse();
        if (data.length >= 99) {
          thelength = 100;
        } else {
          thelength = data.length;
        }
       // console.log('testing : ' + data.length);
        myarrtime = [];
        Object.keys(data).forEach(function(key) {
          for (var keys in JSON.parse(data[key])) {
            myarrtimep = JSON.parse(data[key]);
            timec = keys.substring(keys.lastIndexOf("_ts") + 3, keys.length);
            var thetime = new Date(parseInt(timec)).toLocaleString();
           //console.log('time found there : ' + thetime);
            myarrtime.push(timec);
          }
        });
        //console.log('chargement de la boucle : '+myarrtime.length);
        //console.log('execution : '+myarrtime);
        for (i = 0; i < myarrtime.length; i++) {
          //console.log(parseInt(JSON.parse(localStorage.getItem('notif')).timec)+' X '+ myarrtime[i]);
          if (parseInt(JSON.parse(localStorage.getItem('notif')).timec) < myarrtime[i]) {
            thecountinlocalstorage = parseInt(JSON.parse(localStorage.getItem('notif')).count);
            thenewcountfound0 = thecountinlocalstorage + 1;
            if (thenewcountfound0 >= 99) {
              thenewcountfound = thenewcountfound0;
              towrite='+99';
            } else {
              thenewcountfound = thecountinlocalstorage + 1;
              towrite=thenewcountfound;
            }
            thenewtime = myarrtime[i];
            //console.log('time found :' + myarrtime[i] + ' décompte :' + thenewcountfound);
            notifobject = {
              'count': thenewcountfound,
              'timec': myarrtime[i]
            };
            localStorage.setItem('notif', JSON.stringify(notifobject));
          }
        }
        //gs = ganstatus(startpoint, limit, privkey, uname);
        //console.log('end of script writing '+thenewcountfound+' into badge...')
        if(typeof towrite !== 'undefined'){
        $('.badge').html(towrite);
        $('.badge').css('display','inline-block');
        }
      },
      error: function(data) {
        if(typeof timec == 'undefined'){
        timec =0;
        }
        showresults = {
          "error": "nothing to show"
        };
      },
    });
    // setTimeout(ganstatus, 5000);
  }
  if (localStorage.hasOwnProperty('userinfo') && typeof JSON.parse(localStorage.getItem('userinfo')).privkey !== 'undefined') {
    // localStorage.hasOwnProperty('notif')
    alluserinforegistered = JSON.parse(localStorage.getItem('userinfo'));
    privkey = alluserinforegistered.privkey;
    uname = alluserinforegistered.uname;
    if (!localStorage.hasOwnProperty('notif')) {
      console.log('notif pas trouvée ');
      setupnotifobject = {
        'count': '0',
        'timec': '0'
      };
      localStorage.setItem('notif', JSON.stringify(setupnotifobject));
    }
    if (parseInt(JSON.parse(localStorage.getItem('notif')).count) !== null && parseInt(JSON.parse(localStorage.getItem('notif')).count) > 0) {
      thecountinlocalstorage = parseInt(JSON.parse(localStorage.getItem('notif')).count);
      if(thecountinlocalstorage >99){
      texttowrite = '+99';
      }else{
      texttowrite =thecountinlocalstorage ;
      }
      $('.badge').html(texttowrite);
      $('.badge').css('display', 'inline-block');
    }
    jk = getallnotifstatus(0, 101, privkey, uname);
    setTimeout(jk, 5000);
  }

});
