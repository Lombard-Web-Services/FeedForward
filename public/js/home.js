$(document).ready(function() {
  ehtml = function(str) {
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
  changecouleurviewbutton = function() {
    $('.sv').each(function() {
      if ($(this).is('.selectedview')) {
        $(this).removeClass('selectedview');
      }
    });
  }
  var starnumarray = {
    null: '<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>',
    '0': '<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>',
    '1': '<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>',
    '2': '<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>',
    '3': '<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>',
    '4': '<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingw"></span>',
    '5': '<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>'
  };
  var booleancondition = false;
  // add likes
  $(document).on('click', '[id^=pluslike]', function(e) {
    booleancondition = booleancondition ? false : true;
    idquizlike = this.id.substring(8).toString();
    if (window.flagfound == 1) {
      privkey = JSON.parse(localStorage.getItem('userinfo')).privkey.toString();
      uname = JSON.parse(localStorage.getItem('userinfo')).uname.toString();
      if (booleancondition) {
        addlikes(uname, privkey, idquizlike);
      } else {
        removelikes(uname, privkey, idquizlike);
      }
    }
  });
  async function removelikes(uname, privkey, quizid) {
    //	app.get('/likes/add/:quizid/name/:uname/key/:privkey', async (req,res) => {
    theunlikeurl = '/likes/rm/' + quizid + '/name/' + uname + '/key/' + privkey;
    $.ajax({
      url: theunlikeurl,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      cache: false,
      complete: function(data) {
        //called when complete
      },
      success: function(data) {
        //console.log(data);
        $('#likesnum' + quizid).html(data.thecount)
      },
      error: function(data) {
        showresults = {
          "error": "nothing to show"
        };
        console.log(showresults);
      }
    });
  }
  async function addlikes(uname, privkey, quizid) {
    //	app.get('/likes/add/:quizid/name/:uname/key/:privkey', async (req,res) => {
    thelikeurl = '/likes/add/' + quizid + '/name/' + uname + '/key/' + privkey;
    $.ajax({
      url: thelikeurl,
      type: "GET",
      dataType: "json",
      contentType: "application/json",
      cache: false,
      complete: function(data) {
        //called when complete
      },
      success: function(data) {
        //console.log(data);
        $('#likesnum' + quizid).html(data.thecount);
      },
      error: function(data) {
        showresults = {
          "error": "nothing to show"
        };
        console.log(showresults);
      }
    });
  }
  // add note
  //$(document).on('click', '[id^=notestar]', function(e) {
  //	idquiznote = parseInt(this.id.substring(8));
  //	alert('quiz found note  '+idquiznote);
  //});
  //fa-th : affichage éparpillé 
  $(document).on('click', '.fa-th', function() {
    changecouleurviewbutton();
    $(this).toggleClass('selectedview');
    if (screen.width < 768){
	$('.containerresults').css('grid-template-columns', 'repeat(auto-fit, minmax(8rem, 1fr))');
	}else{
    $('.containerresults').css('grid-template-columns', 'repeat(auto-fit, minmax(13rem, 1fr))');	
	}
    //selectedview
    console.log('affichage éparpillé');
  });
  // affichage en liste
  $(document).on('click', '.fa-th-list', function() {
    changecouleurviewbutton();
    $(this).toggleClass('selectedview');
    console.log('affichage liste');
  });
  // affichage large
  $(document).on('click', '.fa-th-large', function() {
    changecouleurviewbutton();
    $(this).toggleClass('selectedview');
    $('.containerresults').css('grid-template-columns', 'repeat(auto-fit, minmax(15rem, 1fr))');
    console.log('affichage large');
  });
  async function getallquiz(startpoint, limit) {
    if (typeof startpoint == 'undefined') {
      startpoint = 0;
    }
    if (startpoint == 0) {
      $('.containerresults').html('');
    }
    theurl = '/all/' + parseInt(startpoint) + '/mode/img/limit/' + limit;
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
        console.log('success length :' + data.length);
        for (i = 0; i < data.length; i++) {
          for (var key in data[i]) {
            if (key !== 'timestamp' && key !== 'likes' && key !== 'stars') {
              //console.log(data[i][key].intitule);
              quizhometoappend = '<div class="itemcontainerresults">';
              quizhometoappend += '<img src="' + data[i][key].imagepresentation + '" />';
              quizhometoappend += ' <span class="containerresultscaptiontopleft">';
              quizhometoappend += '<span class="fa fa-thumbs-up"></span> <span class="" style="font-color:white;">' + data[i]['likes'] + '</span> </span>';
              quizhometoappend += ' <span class="containerresultscaptiontop">';
              if (typeof starnumarray[data[i]['stars']] == undefined) {
                quizhometoappend += '<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>';
              } else {
                quizhometoappend += starnumarray[data[i]['stars']];
              }
              quizhometoappend += '</span>';
              quizhometoappend += '  <div class="containerresultscaption">' + data[i][key].intitule + ' : ' + data[i][key].description + '</div>';
              quizhometoappend += '  </div>';
              $('.containerresults').append(quizhometoappend).fadeIn();
            }
          }
        }
        //resolve(data);
        //write data
      },
      error: function(data) {
        showresults = {
          "error": "nothing to show"
        };
      },
    });
  }
  // function dosearch
  async function dosearch(searchterm, startpoint, limit) {
    if (typeof startpoint == 'undefined') {
      startpoint = 0;
    }
    if (startpoint == 0) {
      $('.containerresults').html('');
    }
    //    app.get('/alls/q/:searchterm/:startpoint?/mode/:dataimg/limit/:limit?', async (req,res) => {
    theurl = '/alls/q/' + searchterm + '/' + parseInt(startpoint) + '/mode/img/limit/' + limit + '/';
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
        console.log(data);
        $('.spanelementtrouves').html(data.length + ' elements trouvés');
        nombrederesultatsaffichesdosearch = $(".containerresults > .itemcontainerresults").length;
        for (i = 0; i < data.length; i++) {
          for (var key in data[i]) {
            if (key !== 'timestamp' && key !== 'likes' && key !== 'stars') {
              //console.log(data[i][key].intitule);
              if (i > 1) {
                quizhometoappend = '<div class="itemcontainerresults">';
              } else {
                quizhometoappend = '<div class="itemcontainerresults">';
              }
              quizhometoappend += '<img src="' + data[i][key].imagepresentation + '" />';
              quizhometoappend += ' <span class="containerresultscaptiontopleft">';
              quizhometoappend += '<span class="fa fa-thumbs-up"></span> <span class="" style="font-color:white;">' + data[i]['likes'] + '</span> </span>';
              quizhometoappend += ' <span class="containerresultscaptiontop">';
              if (typeof starnumarray[data[i]['stars']] == undefined) {
                quizhometoappend += '<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>&nbsp;<span class="fa fa-star starratingw"></span>';
              } else {
                quizhometoappend += starnumarray[data[i]['stars']];
              }
              quizhometoappend += '</span>';
              quizhometoappend += '  <div class="containerresultscaption">' + data[i][key].intitule + ' : ' + data[i][key].description + '</div>';
              quizhometoappend += '  </div>';
              $('.containerresults').append(quizhometoappend).fadeIn();
            }
          }
        }
        //resolve(data);
        //write data
      },
      error: function(data) {
        showresults = {
          "error": "nothing to show"
        };
      },
    });
  }
  //getallquiz(0,12);
  $(document).on('keyup', '.search_input', function() {
    wordstosearch = $('.search_input').val();
    if (wordstosearch.length > 3) {
      wts = encodeURIComponent(ehtml(wordstosearch));
      //console.log("decoded :"+decodeURIComponent(wts));
      console.log('to search : ' + wts);
      dosearch(wts, 0, 12);
    }
    if (wordstosearch.length == 0) {
      $('.containerresults').html('');
      getallquiz(0, 12);
      nombrederesultats = $(".containerresults > .itemcontainerresults").length;
      $('.spanelementtrouves').html(' ♾  elements trouvés');
    }
  });
  $(document).on('click', '.show-more', function() {
    nombrederesultatsaffiches = $(".containerresults > .itemcontainerresults").length;
    plus6 = parseInt(nombrederesultatsaffiches) + 6;
    getallquiz(nombrederesultatsaffiches, plus6);
  });
});
