$(document).ready(function(){
 var mylang = JSON.parse(localStorage['lang'] || 'defaultValue');
 if(localStorage.hasOwnProperty('userinfo') && typeof JSON.parse(localStorage.getItem('userinfo')).privkey !=='undefined'){
  alluserinforegistered = JSON.parse(localStorage.getItem('userinfo'));
  privkey =alluserinforegistered.privkey;
  uname = alluserinforegistered.uname;
 }
   var starnumarray = {null:'<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>','0':'<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>','1':'<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>','2':'<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>','3':'<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingblue"></span>&nbsp;<span class="fa fa-star starratingblue"></span>','4':'<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingblue"></span>','5':'<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>&nbsp;<span class="fa fa-star starratingy"></span>'};
async function getallquiz(startpoint,limit,privkey,uname){
	if(typeof startpoint=='undefined'){
	startpoint=0;
	}
	//http://localhost:3000/allquiz/0/mode/img/limit/12/user/bibo/api/sxpgckrtb1ncg9hwdzzasu6zmg25x5ph
	theurl  = '/allquiz/'+parseInt(startpoint)+'/mode/img/limit/'+limit+'/user/'+uname+'/api/'+privkey;
	console.log('debug encoding :'+theurl);
            $.ajax({
                url:theurl,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function(data) {
                  //called when complete
                },
                success: function(data) {	
				
				//console.log('success length :'+data.length);
				for(i=0;i<data.length;i++){			
					for (var key in data[i]) {
						if(key !=='timestamp' && key !=='likes' && key!=='stars'){
					//console.log(data[i].timestamp);
					var dateString = new Date(parseInt(JSON.parse(data[i].timestamp))).toLocaleString();

					//var theDate =new Date(Date(data[i].timestamp * 1000));
					//dateString = theDate.toGMTString();
					quizusertoappend =   '<div id="userquizdiv_'+key+'">';
					quizusertoappend +=   '<div class="itemcontainerresults">';
					quizusertoappend +=   '<a href="q'+key+'" target="_self"><img src="'+data[i][key].imagepresentation+'" /></a>';
					quizusertoappend +=   '<div class="containerresultscaptioninline">';
					quizusertoappend +=   '<div class="cross-right" id="userquizdel_'+key+'">';
					quizusertoappend +=   '<span class="fa fa-cross black"></span>';
					quizusertoappend +=   '</div>';
					quizusertoappend +=   '<p  class="descvmyquiz"><b>'+data[i][key].intitule+'</b></p>';
					if(data[i]['stars']==null){
					quizusertoappend +=   '<p>'+langageObject['mots_' + mylang]['note']+' :  <span class="" style="font-color:white;">0</span>';
					}else{
					quizusertoappend +=   '<p>'+langageObject['mots_' + mylang]['note']+' :  <span class="" style="font-color:white;">'+data[i]['stars']+'</span>';
					}
					quizusertoappend +=   ' '+starnumarray[data[i]['stars']]+' ';
					quizusertoappend +=   '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	<span style="text-align:right;"> Likes <span class="fa fa-thumbs-up" style="color:blue;"></span> <span class="" style="font-color:white;">'+data[i]['likes']+'</span> </span></p>';
					quizusertoappend +=   '<p class="descvmyquiz"><i>'+data[i][key].description+'</i></p>';
					quizusertoappend +=   '<p class="descvmyquiz">'+langageObject['mots_' + mylang]['datetext']+' : '+dateString+'</p>';
					quizusertoappend +=   '<p>'+langageObject['mots_' + mylang]['myquizduree']+' : '+data[i][key].timing+'</p>';
					//quizusertoappend +=   '<p>taux de réussites : 02:22</p>';
					//quizusertoappend +=   '<p>Nombres d\'essais totaux : </p>';
					quizusertoappend +=   '</div>';
					quizusertoappend +=   '</div> ';
					quizusertoappend +=   '<hr>';                 					
					quizusertoappend +=   '</div>';                 					
					$('.containerresultsinline').append(quizusertoappend).fadeIn(3000);
						}
					}
				}
				//resolve(data);
				//write data
				loadsTongue(mylang);
               },
                error: function(data) {
				showresults = {"error":"nothing to show"};
                },
              });
}
getallquiz(0,6,privkey,uname);

async function delquiz(akey, privkey, uname){
//delquiz/:akey/api/:privkey/user/:uname
theurl = '/delquiz/'+akey+'/api/'+privkey+'/user/'+uname;
            $.ajax({
                url:theurl,
                type: "GET",
                dataType: "json",
                contentType: "application/json",
                cache: false,
                timeout: 5000,
                complete: function(data) {
                  //called when complete
                },
                success: function(data) {	
				console.log('success :'+JSON.stringify(data));
				$('#userquizdiv_'+akey).remove().fadeOut(3000);
				
				},
                error: function(data) {
				showresults = {"error":"nothing to show"};
                },
              });
}

$(document).on('click', '[id^=userquizdel_]', function(e) {
idquiz = (this.id).replace('userquizdel_','');
delquiz(idquiz, privkey, uname);
});


$(document).on('click', '.show-more',function () {
      	nombrederesultatsaffiches = $("[id^=userquizdiv_]").length;
      	console.log('résultats affichés : '+nombrederesultatsaffiches);
      	plus6 = parseInt(nombrederesultatsaffiches) + 6;
      	getallquiz(nombrederesultatsaffiches,plus6,privkey,uname);
    });
});
