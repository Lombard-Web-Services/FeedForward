$(document).ready(function() {
 var mylang = JSON.parse(localStorage['lang'] || 'defaultValue');
  // array includes replacement for older browsers
  function arrayincludes(array, string) {
    var newArr = array.filter(function(el) {
      return el.indexOf(string) >= 0;
    });
    return newArr.length > 0;
  }
  if (localStorage.hasOwnProperty('userinfo') && typeof JSON.parse(localStorage.getItem('userinfo')).privkey !== 'undefined') {
    alluserinforegistered = JSON.parse(localStorage.getItem('userinfo'));
    privkey = alluserinforegistered.privkey;
    uname = alluserinforegistered.uname;
  }
  initChart = function(id, datas, chartname) {
    var data = datas;
    chartname = $('#' + id).animatedBarChart({
      data: data,
      colors: ['#02a6C4', '#006DBF'],
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
  //initChart(id,datas);
  async function getallresultsbymonth(startpoint, limit, privkey, uname) {
    if (typeof startpoint == 'undefined') {
      startpoint = 0;
    }
    //	app.get('/getresults/api/:privkey/user/:uname/:startpoint/:limit/?', async (req,res) => {
    //http://localhost:3000/allquiz/0/mode/img/limit/12/user/bibo/api/sxpgckrtb1ncg9hwdzzasu6zmg25x5ph
    theurl = '/getresults/api/' + privkey + '/user/' + uname + '/' + parseInt(startpoint) + '/' + limit;
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
        //console.log('success length :'+data.length);
        //console.log(theurl);
        //console.log(data);
        var storeid = [];
        for (i = 0; i < data.length; i++) {
          id = data[i].id;
          // store the month key
          for (key in data[i]) {
            if (key != "id") {
              monthkey = key;
            }
          }
          //console.log(data[i].titre);
          //if an id already exist in the last records of a specific quiz by id
          if (storeid.includes(id)) {
            //console.log('id '+id+' is contained into '+storeid);
            chartid = 'cht' + id;
            otherdataid = 'data' + id.toString();
            oneid = parseInt(window[otherdataid].length) + 1;
            twoid = parseInt(window[otherdataid].length) + 2;
            content1 = {
              "id": oneid,
              "group_name": "Réussite(s)",
              "mois": monthkey,
              "nombre": data[i][monthkey].win
            };
            content2 = {
              "id": twoid,
              "group_name": "Total",
              "mois": monthkey,
              "nombre": data[i][monthkey].total
            };
            window[otherdataid].push(content1);
            window[otherdataid].push(content2);
            //console.log('data added  : '+JSON.stringify(window[otherdataid]));
            chartname2 = 'chart' + id;
            d3.select('#' + chartid).selectAll('svg').remove();
            d3.select('#' + chartid).selectAll(".legend_div").remove();
            sortedchartarray = window[otherdataid].sort((a, b) => a.group_name > b.group_name && 1 || -1);
            //d3.select('#'+chartid).selectAll("svg").data(sortedchartarray);  
            initChart(chartid, sortedchartarray, window[chartname2]);
            //window[chartname].updateChart({ data:  });
          } else {
            writechart = '<hr>';
            writechart += '<h4>' + data[i][monthkey].titre + '</h4>'
            writechart += '<div id="cht' + id + '" class="bcBar"></div>';
            // create chart
            chartid = 'cht' + id;
            dataid = 'data' + id.toString();
            window[dataid] = [];
            content1 = {
              "id": 1,
              "group_name": langageObject['mots_' + mylang]['reussites'].toString(),
              "mois": monthkey,
              "nombre": data[i][monthkey].win
            };
            content2 = {
              "id": 2,
              "group_name": langageObject['mots_' + mylang]['total'].toString(),
              "mois": monthkey,
              "nombre": data[i][monthkey].total
            };
            window[dataid].push(content1);
            window[dataid].push(content2);
            if (parseInt(startpoint) == 0 && i == 0) {
              $('.allcharts').html(writechart);
            } else {
              $('.allcharts').append(writechart);
            }
            chartname = 'chart' + id;
            // Display chart
            initChart(chartid, window[dataid], window[chartname]);
            //console.log('id '+id+' is not contained into '+storeid);
          }
          storeid.push(id);
        }
      },
      error: function(data) {
        showresults = {
          "error": "nothing to show"
        };
      },
    });
  }
  getallresultsbymonth(0, 12, privkey, uname);
  $(document).on('click', '.show-more', function() {
    nombrederesultatsaffiches = $(".containerresultsinline > .itemcontainerresults").length;
    plus12 = parseInt(nombrederesultatsaffiches) + 12;
    getallresultsbymonth(nombrederesultatsaffiches, plus12, privkey, uname);
  });
});
