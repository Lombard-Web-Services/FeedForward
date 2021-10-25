$(document).ready(function() {
  var mylang = JSON.parse(localStorage['lang'] || 'defaultValue');
  if (localStorage.hasOwnProperty('userinfo') && typeof JSON.parse(localStorage.getItem('userinfo')).privkey !== 'undefined') {
    alluserinforegistered = JSON.parse(localStorage.getItem('userinfo'));
    privkey = alluserinforegistered.privkey;
    uname = alluserinforegistered.uname;
  }
  async function getallnotif(startpoint, limit, privkey, uname) {
    if (typeof startpoint == 'undefined') {
      startpoint = 0;
    }
    theurl = '/getnotif/api/' + privkey + '/user/' + uname + '/' + parseInt(startpoint) + '/' + limit;
    $.ajax({
      url: theurl,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      cache: false,
      timeout: 5000,
      complete: function(data) {
      //called when complete
      },
      success: function(data) {
        //console.log('success length :' + data);
        for (i = 0; i < data.length; i++) {
          for (key in JSON.parse(data[i])) {
            //console.log(key);
            //console.log('key : '+data[i][key]);
            kts = key.toString();
            eventnametranslatable = (JSON.parse(data[i])[key].event).toString();
            beforenametranslatable = (JSON.parse(data[i])[key].before).toString();
            afternametranslatable = (JSON.parse(data[i])[key].after).toString();
            timec = key.substring(key.lastIndexOf("_ts") + 3, key.length);
            var thetime = new Date(parseInt(timec)).toLocaleString();
            //console.log(data[i]);
            msgtoshow = '<div class="containerresultscaptionnotifinline"><i>' + thetime + '</i> ';
            if (beforenametranslatable !== 'none') {
              msgtoshow += beforenametranslatable + ' ';
            }
            myeventtotranslate =  eventnametranslatable.toString();
			theevnt = langageObject['mots_' + mylang][window.myeventtotranslate];
            msgtoshow +=' '+theevnt+' ';
            if (afternametranslatable !== 'none') {
              msgtoshow += ' ' + afternametranslatable;
            }
            msgtoshow += '</div>';
            msgtoshow += '<hr>';
            if (startpoint == 0 && i == 0) {
              $('.containerresultsnotifinline').html(msgtoshow);
            } else {
              $('.containerresultsnotifinline').append(msgtoshow);
            }
          }
        }
       // adjust tongues
       window.loadsTongue(mylang);
      },
      error: function(data) {
        showresults = {
          "error": "nothing to show"
        };
      },
    });
  }
  getallnotif(0, 12, privkey, uname);
  $(document).on('click', '.show-more', function() {
	nombrederesultatsaffiches = 0;
    nombrederesultatsaffiches = $(".containerresultsnotifinline > .containerresultscaptionnotifinline").length;
    plus20 = parseInt(nombrederesultatsaffiches) + 20;
    console.log('show : '+nombrederesultatsaffiches+' / '+plus20);
    getallnotif(nombrederesultatsaffiches, plus20, privkey, uname);
  });
});
