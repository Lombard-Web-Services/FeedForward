$(document).ready(function(){
var mylang = JSON.parse(localStorage['lang'] || 'defaultValue');
var form = $("#login");
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
 			minlength: 3,
 		},
 		pwd: {
 			required: true,
 			minlength: 5,
 		}
 	},
 	messages: {
		uname: {
 			required: "<i style=\"font-style:italic;text-align:center;color:white;margin:auto;\">"+langageObject['mots_'+mylang]['nomdutilisateurincorrect']+"</i>",
 		},
 		pwd : {
 			required: "<i style=\"font-style:italic;text-align:center;color:white;margin:auto;\">"+langageObject['mots_'+mylang]['motdepasseincorrect']+"</i>",
 		}
 	}});
form.validate();
var timestamp = Date.now();
// créé l'empreinte navigateur
var fp4 = new Fingerprint();
var fg = fp4.get();
var ts = fg.toString();
var hash = CryptoJS.RIPEMD160(ts);
$("[name='fingerprint']").val(hash);

var useragent = navigator.userAgent;
$(document).on('click', 'input[name="login"]', function() {
if (form.valid() === true){
lang = $(".custom-select option:selected").val();
uname = $('input[name="uname"]').val();
pwd = $('input[name="pwd"]').val();
forgeformlogin ={'uname':uname,'pwd':pwd,'ua':useragent,'fp':$('.fp').val(),'lang':lang};
// ci-dessous cela fonctionne
theurl = "/login?";
            $.ajax({
                url:theurl,
                type: "POST",
                dataType: "json",
                data: JSON.stringify(forgeformlogin),
                contentType: "application/json",
                cache: false,
                complete: function(data) {
                  //called when complete
                },
                success: function(data) {
				  console.log(data.apikey)
                  localStorage.setItem('userinfo',JSON.stringify(data));
                  //datanotif={'count':0,'total':0};
                  //localStorage.setItem('notif',JSON.stringify(datanotif));
                 window.hb = undefined; 
                 $("script[src='js/auth.js']").remove();
                 tr = window.location.href;
                 dest = tr.replace('login','home');
				 console.log('moving to dest '+dest);
                  //window.location.href='home'; 
                  $("<meta http-equiv='refresh' content='0;url="+dest+"'>").appendTo('head');

               },
                error: function(data) {
                  flagfound=0;
                },
              });    
}
});

$(document).on('click', 'input[name="register"]', function() {
window.location.href='senregistrer';
});
});
