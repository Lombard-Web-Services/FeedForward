$(document).ready(function() {
  // un-comment for https
  if (location.protocol !== 'https:') {
	 loc =  document.location.href;
	 newloc = loc.replace("http", "");
     location.replace(https+newloc);
  }
  var fp4 = new Fingerprint();
  var fg = fp4.get();
  var ts = fg.toString();
  var hash = CryptoJS.RIPEMD160(ts);
  $("[name='fingerprint']").val(hash);
  rn = Math.floor(Math.random() * 10);
  var timestamp = Date.now();
  hb = function () {
    verif_chemin = window.location.pathname;
    currentfile = verif_chemin.substring(verif_chemin.lastIndexOf("/") + 1, verif_chemin.length);
    currentfilevariante = currentfile + '#';
    // each seconds reload the heartbeat
	// setTimeout(heartbeat, 500);

    flagfound = 0;
    if (localStorage.hasOwnProperty('userinfo') && typeof JSON.parse(localStorage.getItem('userinfo')).privkey !== 'undefined') {
      alluserinforegistered = JSON.parse(localStorage.getItem('userinfo'));
      flagfound = 1;
    }
    // redirect to login
    if (((currentfile !== 'home' && currentfile != 'login') || (currentfile.charAt(0) !== 'q' && currentfile !== 'login') || (currentfile !== 'senregistrer' && currentfile !== 'login')) && (currentfile == 'myquiz' || currentfile == 'mynotifications' || currentfile == 'stats' || currentfile == 'create-quiz') && (flagfound == 0)) {
      window.location.href = 'login';
    } else if ((flagfound == 1) && (currentfile == 'login')) {
      window.location.href = 'home';
    } else {}
  }
  //hb(); // initialize it
  setTimeout(hb(), 1000);

  thefp = $("[name='fingerprint']").val();
  checkuser = 'userauth/' + $("[name='fingerprint']").val();
  $.ajax({
    url: checkuser,
    dataType: 'json',
    json: 'callback',
    success: function(msg) {
      var userauth = msg.response;
      if (typeof userauth == 'undefined') {
        localStorage.removeItem('userinfo');
      }
      verif_chemin = window.location.pathname;
	  currentfile = verif_chemin.substring(verif_chemin.lastIndexOf("/") + 1, verif_chemin.length);
      if(msg.response =='yes' && currentfile=='login'){
	  hb=undefined;
	  //console.log('home redirect');
	  //window.location.href='home';
	  }
      console.log('user auth : ' + msg.response);
    },
    error: function() {
      console.log('user not authenticated with failure too');
    }
  });
  // footer hooks
  // my content 
  var pdp = '    <div class="pdp">';
  pdp += '      <div class="signoutfooter">';
  pdp += '        <a style="color:#006DBF; text-decoration:none" id=""><span class="fa fa-signout"></span></a>';
  pdp += '      </div>';
  pdp += '      <!--<div class="groupfooter">';
  pdp += '        <a style="color:#006DBF; text-decoration:none" id=""><span class="fa fa-user"></span></a>';
  pdp += '      </div>';
  pdp += '      <div class="clouddownload">';
  pdp += '        <a style="color:#006DBF; text-decoration:none" id=""><span class=""></span></a>';
  pdp += '      </div>-->';
  pdp += ' </div>';
  if (flagfound == 1) {
    $('body').last().append(pdp);
    var resize_footerbutton = function() {
      var pieddepage_height = $('.pdp').outerHeight();
      var pdp_height = $('.pdp').outerHeight();
      var pdp_width = $('.pdp').outerWidth();
      $('.pdp').css('left', Math.max(0, (($(window).width() - pdp_width) / 2) + $(window).scrollLeft()) + 'px');
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      $('.pdp').addClass('pdp-fixed').css({
        'bottom': 0
      });
    }
    resize_footerbutton();
    $(window).resize(function() {
      resize_footerbutton();
    });
    $(window).on('scroll', function() {
      var pieddepage_height = $('.pdp').outerHeight();
      var pdp_height = $('.pdp').outerHeight();
      var scrollHeight = $(document).height();
      var scrollPosition = $(window).height() + $(window).scrollTop();
      if ((scrollHeight - (scrollPosition + pdp_height)) / scrollHeight === 0) {
        $('.pdp').removeClass('pdp-fixed');
        $('.pdp').addClass('pdp-static').css({
          'bottom': pieddepage_height
        });
      } else {
        $('.pdp').removeClass('pdp-static');
        $('.pdp').addClass('pdp-fixed').css({
          'bottom': 0
        });
      }
    });
    // end of footer hooks
    $(document).on('click', '.signoutfooter', function() {
      localStorage.clear();
      window.location.href = 'login';
    });
  }
  if (flagfound == 1 && currentfile != 'senregistrer' && currentfile != 'login') {
    thenavbar = '<div class="navigation fixed-top">';
    thenavbar += '  <nav class="navbar navbar-toggleable-xl navbar-light flex-nowrap flex-row navbar-expand-sm">';
    thenavbar += '    <a class="navbar-nav mr-auto" href="login"><img src="images/QUIZ3.png" style="height:3rem;"/></a>';
    thenavbar += '    <div class="mx-auto justify-content-center align-items-center">';
    thenavbar += '      <ul class="nav navbar-nav mx-auto">';
    thenavbar += '        <li class="nav-item">';
    thenavbar += '          <a class="nav-link" href="home"> <span class="fa fa-home"></span></a>';
    thenavbar += '        </li>';
    thenavbar += '        <li class="nav-item">';
    thenavbar += '          <a class="nav-link" href="create-quiz"><span class="fa fa-creerlequiz"></span></a>';
    thenavbar += '        </li>';
    thenavbar += '        <li class="nav-item">';
    thenavbar += '          <a class="nav-link" href="myquiz"><span class="fa fa-list-alt"></span></a>';
    thenavbar += '        </li>';
    thenavbar += '        <li class="nav-item notification" >';
    thenavbar += '          <a class="nav-link" href="mynotifications"> <span class="fa fa-bell"></span></a>';
    thenavbar += '          <span class="badge" style="display:none;">0</span>';
    thenavbar += '        </li>';
    thenavbar += '        <li class="nav-item">';
    thenavbar += '          <a class="nav-link" href="stats"> <span class="fa fa-signal"></span></a>';
    thenavbar += '        </li>';
    thenavbar += '      </ul>';
    thenavbar += '    </div>';
    thenavbar += '    <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">';
    thenavbar += '      <span class="navbar-toggler-icon"></span>';
    thenavbar += '      </button>  -->';
    thenavbar += '    <div id="navbarText" class="navbar-nav ml-auto justify-content-end">';
    thenavbar += '      <select id="country_select" class="custom-select navbarText"></select>';
    thenavbar += '      <!-- <a class="ml-auto exit" href="#"><span class="fa fa-signout"></span></a>-->';
    thenavbar += '    </div>';
    thenavbar += '  </nav>';
    thenavbar += '</div>';
    $('body').prepend(thenavbar);
    var allLinks = $('.navbar-nav a').map(function() {
      if ($(this).attr('href') == currentfile) {
        $(this).closest("li").addClass("active");
      }
      //return $(this).attr('href');
    }).get();
  } else {
    thenavbar = '<div class="navigation fixed-top">';
    thenavbar += ' <nav class="navbar navbar-toggleable-xl navbar-light flex-nowrap flex-row navbar-expand-sm">';
    thenavbar += '  <a class="navbar-nav mr-auto" href="login">';
    thenavbar += '   <img src="images/QUIZ3.png" alt="logo" style="height:3rem;" />';
    thenavbar += '  </a>';
    thenavbar += '  <div class="mx-auto justify-content-center align-items-center styledisplaynone">';
    thenavbar += '   <ul class="nav navbar-nav mx-auto">';
    thenavbar += '    <li class="nav-item">';
    thenavbar += '     <a class="nav-link" href="#">';
    thenavbar += '      <span class="fa fa-home"></span>';
    thenavbar += '     </a>';
    thenavbar += '    </li>';
    thenavbar += '    <li class="nav-item">';
    thenavbar += '     <a class="nav-link" href="#">';
    thenavbar += '      <span class="fa fa-creerlequiz"></span>';
    thenavbar += '     </a>';
    thenavbar += '    </li>';
    thenavbar += '    <li class="nav-item active">';
    thenavbar += '     <a class="nav-link" href="#">';
    thenavbar += '      <span class="fa fa-user"></span>';
    thenavbar += '      <span class="sr-only">(current)</span>';
    thenavbar += '     </a>';
    thenavbar += '    </li>';
    thenavbar += '    <li class="nav-item">';
    thenavbar += '     <a class="nav-link" href="#">';
    thenavbar += '      <span class="fa fa-bell"></span>';
    thenavbar += '     </a>';
    thenavbar += '    </li>';
    thenavbar += '    <li class="nav-item">';
    thenavbar += '     <a class="nav-link" href="#">';
    thenavbar += '      <span class="fa fa-signal"></span>';
    thenavbar += '     </a>';
    thenavbar += '    </li>';
    thenavbar += '   </ul>';
    thenavbar += '  </div>';
    thenavbar += '  <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>-->';
    thenavbar += '  <div id="navbarText" class="navbar-nav ml-auto justify-content-end">';
    thenavbar += '   <select id="country_select" class="custom-select navbarText"></select>';
    thenavbar += '   <!-- <a class="ml-auto exit" href="#"><span class="fa fa-signout"></span></a>-->';
    thenavbar += '  </div>';
    thenavbar += ' </nav>';
    thenavbar += '</div>';
    $('body').prepend(thenavbar);
  }
});
