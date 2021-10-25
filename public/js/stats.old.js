$(document).ready(function(){
 if(localStorage.hasOwnProperty('userinfo') && typeof JSON.parse(localStorage.getItem('userinfo')).privkey !=='undefined'){
  alluserinforegistered = JSON.parse(localStorage.getItem('userinfo'));
  privkey =alluserinforegistered.privkey;
  uname = alluserinforegistered.uname;
 }
	initChart();
	   });
	   initChart = function(id data) {
		  var data = getData();
		  chart = $('#chtAnimatedBarChart').animatedBarChart({
			 data: data,
			 colors:['#02a6C4', '#006DBF'],
			 params: {
				group_name: 'group_name',
				name: 'mois',
				value: 'nombre'
			 },
			 bars: {
				hover_name_text: 'mois',
				hover_value_text: 'nombre'
			 },
			 x_grid_lines: false,
			 y_grid_lines: false
		  });
	   }

	   initChartAll = function() {
		  $('.link-active').removeClass('link-active');
		  $('#lnkAll').addClass('link-active');

		  var data = getData();
		  chart.updateChart({ data: data });
	   }

	   initChartFiltered = function() {
		  $('.link-active').removeClass('link-active');
		  $('#lnkFiltered').addClass('link-active');

		  var data = getFilteredData();
		  chart.updateChart({ data: data });
	   }
	   getData = function() {
		  return [
			 { "id": 1, "group_name": "Réussite(s)", "mois": "Oct", "nombre": 28 },
			 { "id": 2, "group_name": "Réussite(s)", "mois": "Nov", "nombre": 21 },
			 { "id": 3, "group_name": "Réussite(s)", "mois": "Dec", "nombre": 49 },
			 { "id": 4, "group_name": "échec(s)", "mois": "Oct", "nombre": 30 },
			 { "id": 5, "group_name": "échec(s)", "mois": "Nov", "nombre": 16 },
			 { "id": 6, "group_name": "échec(s)", "mois": "Dec", "nombre": 36 },
		  ];
	   }
	   getFilteredData = function() {
		  return [
			 { "id": 1, "group_name": "Réussite(s)", "mois": "Oct", "nombre": 28927 },
			 { "id": 2, "group_name": "échec(s)", "mois": "Oct", "nombre": 30701 },
		  ];
	   }


 
async function getallresultsbymonth(startpoint,limit,privkey,uname){
	if(typeof startpoint=='undefined'){
	startpoint=0;
	}
	//	app.get('/getresults/api/:privkey/user/:uname/:startpoint/:limit/?', async (req,res) => {
getresults/api/:privkey/user/:uname/:startpoint/:limit/
	//http://localhost:3000/allquiz/0/mode/img/limit/12/user/bibo/api/sxpgckrtb1ncg9hwdzzasu6zmg25x5ph
	theurl  = '/getresults/api/'+privkey+'/user/'+uname+'/'+parseInt(startpoint)+'/'+limit;
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
				console.log('success length :'+data.length);
				console.log(data);
				for(i=0;i<data.length;i++){			
					for (var key in data[i]) {


					}
				}
				//resolve(data);
				//write data
               },
                error: function(data) {
				showresults = {"error":"nothing to show"};
                },
              });
}
getallresultbymonth(0,12,privkey,uname);


$(document).on('click', '.show-more',function () {
      	nombrederesultatsaffiches = $(".containerresultsinline > .itemcontainerresults").length;
      	plus12 = parseInt(nombrederesultatsaffiches) + 12;
      	getallresultbymonth(nombrederesultatsaffiches,plus12,privkey,uname);
    });
});
