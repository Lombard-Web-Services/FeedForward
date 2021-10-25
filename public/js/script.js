(function($,undefined){
  '$:nomunge'; // Used by YUI compressor.

  $.fn.serializeObject = function(){
    var obj = {};

    $.each( this.serializeArray(), function(i,o){
      var n = o.name,
        v = o.value;

        obj[n] = obj[n] === undefined ? v
          : $.isArray( obj[n] ) ? obj[n].concat( v )
          : [ obj[n], v ];
    });

    return obj;
  };

})(jQuery);
$(document).ready(function(){
// module linguistique.
mylang = JSON.parse(localStorage['lang'] || 'defaultValue');

var current_fs, next_fs, previous_fs; //fieldsets
var opacity;
var current = 1;
var steps = $("fieldset").length;
function setProgressBar(curStep){
var percent = parseFloat(100 / steps) * curStep;
percent = percent.toFixed();
$(".progress-bar")
.css("width",percent+"%")
}
 jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^[\w.]+$/i.test(value);
}, "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['seulslettresnombresacceptes']+"</i>");
//hide the current fieldset with style
setProgressBar(current);
// Début du form validation
var form = $("#inscription");
 form.validate({
  ignore: ":hidden",
 	errorElement: 'div',
 	errorClass: 'help-blocklogin',
 	highlight: function(element, errorClass, validClass) {
 		$(element).closest('.form-wrapper').addClass("has-error");
 	},
 	unhighlight: function(element, errorClass, validClass) {
 		$(element).closest('.form-wrapper').removeClass("has-error");
 	},
 	rules: {
 		uname: {
 			required: true,
			alphanumeric: true,
 			minlength: 3,
 		},
 		pwd: {
 			minlength: 5,
 		},
 		cpwd: {
 			minlength: 5,
       equalTo : "#password"
 	},
  email: {
 			required: true,
 			email: true,
 			minlength: 4,
 		},
 		fname: {
 			required: true,
 			minlength: 3,
 		},
 		lname: {
 			required: true,
 			minlength: 3,
 		},
     phne: {
 			required: true,
 			number: true,
 		}
 	},
 	messages: {
		uname: {
 			required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['nomdutilisateurincorrect']+"</i>",
 		},
 		pwd : {
 			required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['motdepasseincorrect']+"</i>",
 		},
 		cpwd : {
 			required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['motdepassenonidentique']+"</i>",
 		},
      email: {
 			required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['adresseemailincorrecte']+"</i>",
 		},
 		fname: {
 			required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['prenomincorrect']+"</i>",
 		},
 		lname: {
 			required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['nomincorrect']+"</i>",
 		},
      phne: {
 			required: "<i style=\"font-style:italic;text-align:center;color:red;margin:auto;\">"+langageObject['mots_'+mylang]['numdetelchiffre']+"</i>",
 		}
 	}});
$(".next").click(function(){
var form = $("#inscription");
form.validate();
if (form.valid() === true){
 current_fs = $(this).parent();
next_fs = $(this).parent().next();
//Add Class Active
$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
//show the next fieldset
next_fs.show();
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;
current_fs.css({
'display': 'none',
'position': 'relative'
});
next_fs.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(++current);
 }
});
$(".previous").click(function(){
current_fs = $(this).parent();
previous_fs = $(this).parent().prev();
//Remove class active
$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
//show the previous fieldset
previous_fs.show();
//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;
current_fs.css({
'display': 'none',
'position': 'relative'
});
previous_fs.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(--current);
});
$(".submit").click(function(){
if ($("#usercreator").is(":checked")) {
 $("#usercreator").val('creator');
} else {
 $("#usercreator").val('user');
}
var timestamp = Date.now();
 // créé l'empreinte navigateur
var fp4 = new Fingerprint();
var fg = fp4.get();
var ts = fg.toString();
var hash = CryptoJS.RIPEMD160(ts);
var ua = navigator.userAgent;
var random64 = [...Array(64)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
var random16 = [...Array(16)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
var random32 = [...Array(32)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
var random4 = timestamp+[...Array(4)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

$("[name='fingerprint']").val(hash);
leformulaire = $('form').serializeObject();
leformulaire['timestamp']  = timestamp;
leformulaire['apikey'] = random64;
leformulaire['privkey'] = random32;
leformulaire['ua'] =  ua;
leformulaire['uuid'] =  random16+hash;
leformulaire['referer'] =  window.document.location.href;
leformulaire['lang'] = JSON.parse(localStorage['lang'] || 'defaultValue');

lejson = {'fp':$("[name='fingerprint']").val(),'ua':ua,'uuid':random16+hash,'apikey':random64};
localStorage.setItem('userinfo',JSON.stringify(leformulaire));
userinfolocal = JSON.parse(localStorage.getItem('userinfo'));
console.log(leformulaire);
username =leformulaire.uname;
theurl="register/"+username;
console.log('username trouvé : '+username);
// ci-dessous cela fonctionne
            $.ajax({
                url:theurl,
                type: "POST",
                dataType: "json",
                data: JSON.stringify(leformulaire),
                contentType: "application/json",
                cache: false,
                complete: function(data) {
                  //called when complete
                  console.log('process complete');
                },

                success: function(data) {
                  console.log(data);
                  console.log('utilisateur enregistré');
                  //mysuccess = '<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>';
                  //mysuccess += '  <div class="lang-success success" style="font-size:3em; text-align:center;color:#006DBF;">Enregistré</div>';
                  //$('.success-animation').html(mysuccess).fadeIn(3000);
                  window.location.href='login';
               },

                error: function() {
                  console.log('process error');
                },
              });    
    
    
    
// localhost:3000/register/'+uname+'/callback/abs
//$.ajax({
//	type: "POST",
//	url : theurl,
//	data:leformulaire,
//	dataType:"jsonp",
//	jsonp:"callback",
//	success:function(data)
//	{	
//	variable=data;
//	console.log('success : '+data);
//	
//	if (typeof(variable.success) !== "undefined") {
//	$(".purple-text").html('');
//	$(".success").html('BRAVO');
//	// on redesign les résultats
//   	$('<span class="successicon"></span>').hide().appendTo('.purple-text').fadeIn(1000);
//    $(data.success).hide().appendTo('.success').fadeIn(1000);
// 	}else{
// $(".purple-text").html('');
//	$(".success").html('');
//	$('<span class="erroricon"></span>').hide().appendTo('.purple-text').fadeIn(1000);	
// $('<p style="color:red;">'+langageObject['mots_'+mylang]['erreur']+variable.error+'</p><a style="" href="'+window.location.protocol+''+window.location.hostname+window.location.pathname+'" target="_self" alt="recharger la page">Cliquez ici pour recharger la page</a>.').hide().appendTo('.success').fadeIn(1000);
//	}
//	},error:function(){
//// do nothing, every error are shown anyway
// }
//});
});
});
