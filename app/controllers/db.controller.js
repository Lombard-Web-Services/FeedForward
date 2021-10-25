const db = require("../../config/db");
const langfile = require('../../public/js/lang2.js');
const readaquiz = require('./readaquiz.controller');
class Quiz {
  // delete records
  async delrecordsbykey(akey) {
    var akey;
    try {
      var todel = await db.get(akey);
      if (todel) {
        await db.del(akey)
        var retmsg = '{"success":"records deleted."}';
        return retmsg;
      }
    } catch (err) {
      var retmsg = '{"error":"records not found."}';
      return retmsg;
    }
  }
  // delete a range of values by keys array
  async delrecordsbykeys(arange) {
    var akey;
    try {
	  for (var i=0;i<arange.length;i++){
      var todel = await db.get(arange[i]);
      if (todel) {
        await db.del(arange[i]);
        var retmsg = '{"success":"records deleted."}';
      }
     }
    return retmsg;
    } catch (err) {
      var retmsg = '{"error":"records not found."}';
      return retmsg;
    }
  }
  // check if user exist
  async checkifuserexist(uname) {
    const username = 'user_' + uname;
    try {
      return await db.get(username);
    } catch (err) {
      return false;
    }
  }
  //get the latest quiz id.
  async getlatestrecordnamenumber() {
    const crs = await db.createReadStream({
      limit: -1,
      reverse: true
    });
    let count = [];
    crs.on("data", function(data) {
      var unevalue = 'the value'; //data.value
      let isnum = /^\d+$/.test(data.key);
      var thekey = data.key;
      if (isnum) {
        count.push(thekey);
      }
    });
    return new Promise(function(resolve, reject) {
      crs.on("end", function() {
        resolve(count[0]);
      });
    });
  }
  // read all quiz with limit default data url scheme
  async readallQuiz() {
    let arrresults = [];
    const crs = await db.createReadStream({
      gte: 'quiz_',
      lte: 'quiz_~',
      reverse: true
    });
    crs.on("data", function(data) {
      var isnumpre = data.key.substr(5);
      let isnum = isnumpre.match(/^[0-9a-z]+$/);
      var k = data.key;
      var v = data.value;
      var thekey = '{' + k + ':' + v + '}';
      if (isnum) {
        var firstob = JSON.parse(data.value);
        arrresults.push(firstob);
      }
    });
    return new Promise(function(resolve, reject, thecount) {
      crs.on("end", function() {
        resolve(arrresults);
      });
    });
  }
  // read all quiz data replacing img
  async readallQuizimg() {
    let arrresults = [];
    const crs = await db.createReadStream({
      gte: 'quiz_',
      lte: 'quiz_~',
      reverse: true
    });
    crs.on("data", function(data) {
      var isnumpre = data.key.substr(5);
      let isnum = isnumpre.match(/^[0-9a-z]+$/);
      var k = data.key;
      var v = data.value;
      var thekey = '{' + k + ':' + v + '}';
      //console.log(k)
      if (isnum) {
        var firstob = JSON.parse(data.value);
        firstob[isnumpre].imagepresentation = 'imagepresentation/' + isnumpre;
        for (let i = 0; i < firstob[isnumpre].allquestions.length; i++) {
          var questionnum = firstob[isnumpre].allquestions[i].questionnumero;
          firstob[isnumpre].allquestions[i].imagequestion = 'imagequestion/' + isnumpre + '/num/' + questionnum;
        }
        arrresults.push(firstob);
      }
    });
    return new Promise(function(resolve, reject) {
      crs.on("end", function() {
        resolve(arrresults);
      });
    });
  }
   // read all quiz search terms with limit default data url scheme
  async readallQuizs(searchterm) {
    let arrresults = [];
    const crs = await db.createReadStream({
      gte: 'quiz_',
      lte: 'quiz_~',
      reverse: true
    });
    crs.on("data", function(data) {
      var isnumpre = data.key.substr(5);
      let isnum = isnumpre.match(/^[0-9a-z]+$/);
      var k = data.key;
      var v = data.value;
      var thekey = '{' + k + ':' + v + '}';
      if (isnum) {
        var firstob = JSON.parse(data.value);
        arrresults.push(firstob);
      }
    });
    return new Promise(function(resolve, reject, thecount) {
      crs.on("end", function() {
        resolve(arrresults);
      });
    });
  }
  // read all quiz data with search terms  replacing img
  async readallQuizsimg(searchterm,limit) {
	var limit;
	var searchterm;
    let arrresults = [];
    const crs = await db.createReadStream({
      gte: 'quiz_',
      lte: 'quiz_~',
      reverse: true
    });
    var xy=0;
    crs.on("data", function(data) {
      var isnumpre = data.key.substr(5);
      let isnum = isnumpre.match(/^[0-9a-z]+$/);
      var k = data.key;
      var v = data.value;
      var thegoodkey = k.replace('quiz_','');
      for(var key in JSON.parse(v)){
	  if(key ==thegoodkey && searchterm.length>0){
		var datatosearch = JSON.parse(v)[key].intitule;
		var zz=datatosearch.replace(/&#([0-9]+);/g, function(full, int) { return String.fromCharCode(parseInt(int))});
		var xx = searchterm.replace(/&#([0-9]+);/g, function(full, int) { return String.fromCharCode(parseInt(int))});
		//console.log('phrase : '+zz+' item searched '+xx+' searchterm '+searchterm);
		if (zz.indexOf(xx) >= 0){
		//if(datatosearch.includes(mysearchterm)) {
			xy++;
		//found
		//console.log('result found '+xx+' in '+zz);
		var thekey = '{' + k + ':' + v + '}';
		  //console.log(k)
		  if (isnum) {
			var firstob = JSON.parse(data.value);
			firstob[isnumpre].imagepresentation = 'imagepresentation/' + isnumpre;
			for (let i = 0; i < firstob[isnumpre].allquestions.length; i++) {
			  var questionnum = firstob[isnumpre].allquestions[i].questionnumero;
			  firstob[isnumpre].allquestions[i].imagequestion = 'imagequestion/' + isnumpre + '/num/' + questionnum;
			}
			arrresults.push(firstob);
		  }
		}
		}
	  }
      //if(str.match(/(^|\W)stack($|\W)/)) {


    });
    return new Promise(function(resolve, reject) {
      crs.on("end", function() {
        resolve(arrresults);
      });
    });
  }
  //read all results value events
  async readallresults(quizid) {
    var uname;
    let arrresults = [];
    let gtetoget = 'result_' + quizid;
    let ltetoget = 'result_' + quizid + '~';
    const crs = await db.createReadStream({
      gte: gtetoget,
      lte: ltetoget,
      reverse: true
    });
    crs.on("data", function(data) {
      var k = data.key;
      var v = data.value;
      var thekey = '{"' + k + '":' + v + '}';
      arrresults.push(v);
    });
    return new Promise(function(resolve, reject, thecount) {
      crs.on("end", function() {
        resolve(arrresults);
      });
    });
  }
  //read all results keys
  async readallresultskeys(quizid) {
    var uname;
    let arrresults = [];
    let gtetoget = 'result_' + quizid;
    let ltetoget = 'result_' + quizid + '~';
    const crs = await db.createReadStream({
      gte: gtetoget,
      lte: ltetoget,
      reverse: true
    });
    crs.on("data", function(data) {
      var k = data.key;
      var v = data.value;
      var thekey = '{"' + k + '":' + v + '}';
      arrresults.push(k);
    });
    return new Promise(function(resolve, reject, thecount) {
      crs.on("end", function() {
        resolve(arrresults);
      });
    });
  }
  //read all notifications events
  async readallnotif(uname) {
    var uname;
    let arrresults = [];
    let gtetoget = 'notif_' + uname;
    let ltetoget = 'notif_' + uname + '~';
    const crs = await db.createReadStream({
      gte: gtetoget,
      lte: ltetoget,
      reverse: true
    });
    crs.on("data", function(data) {
      var k = data.key;
      var v = data.value;
      var thekey = '{"' + k + '":' + v + '}';
      arrresults.push(thekey);
    });
    return new Promise(function(resolve, reject, thecount) {
      crs.on("end", function() {
        resolve(arrresults);
      });
    });
  }
  // read all likes
  async countalllikes(quizid,uname,mode) {
    var uname;
    var mode;
    let arrresults = [];
    let gtetoget = 'like_' + quizid;
    let ltetoget = 'like_' + quizid + '~';
    const crs = await db.createReadStream({
      gte: gtetoget,
      lte: ltetoget,
      reverse: true
    });
    var z=0;
    var count = [];
    crs.on("data", function(data) {
      var k = data.key;
      // unlimited likes backdoor remove z condition
      var tsp = k.split("_user_");
      if(uname == tsp[1]){
	        z++;
	  }
      if(mode == 'add' && z > 1 && tsp[1] == uname){
	 //  console.log('deletion test : '+k);
	   const del = db.del(k);
	  }
	  if(mode =='add'){
      var thekey =  k;
      //console.log('mode add '+uname+' key '+thekey);
      count.push(k);
      }
      if(mode == 'rm'){
      if(tsp[1] == uname){
	   const del = db.del(k);
	  }else{
      var thekey =  k;
      count.push(k);	  
	  }}
    });
    return new Promise(function(resolve, reject, thecount) {
      crs.on("end", function() {
        resolve(count);
      });
    });
  }
  // read all note stars
  async countallstars(quizid,uname,mode) {
    var uname;
    let arrresults = [];
    let gtetoget = 'note_' + quizid;
    let ltetoget = 'note_' + quizid + '~';
    const crs = await db.createReadStream({
      gte: gtetoget,
      lte: ltetoget,
      reverse: true
    });
    var count = [];
   
    crs.on("data", function(data) {
      var k = data.key;
      // unlimited likes backdoor (remove next 5 lines and '}')
      var tsp = k.split("_user_");
    //  if(mode == 'add' && uname == tsp[1]){
	  //const del = db.del(k);
      var v = data.value;
      var thekey = parseInt(v);
      //console.log('ki found '+thekey);
      count.push(thekey);
	 // }else if(mode=='add'){
     // var v = data.value;
      // var thekey =  k;
     // var thekey = '{' + k + ':' + v + '}';
     // console.log('ki2 found '+thekey);
     // count.push(thekey);
     //}else{
	  // do nothing
	 // }
    });
    return new Promise(function(resolve, reject, thecount) {
      crs.on("end", function() {
        resolve(count);
      });
    });
  }
  // create a notification event
  async regnotif(uname, events) {
    var timestamp = Date.now();
    var keytoregister = 'notif_' + uname + '_ts' + timestamp;
    await db.put(keytoregister, events);
  }
  // save a specific note x/5
  async regnote(user, quizid, events) {
    var timestamp = Date.now();
    var keytoregister = 'note_' + quizid + '_ts' + timestamp+ '_user_'+user;
    await db.put(keytoregister, events);
  }
  // save likes
  async reglike(user, quizid, events) {
	var timestamp = Date.now();
    var keytoregister = 'like_' + quizid + '_ts' + timestamp+ '_user_'+user;
    await db.put(keytoregister, events);
  }
  // register a result into the database
  async regresult(quizid, user, info) {
    var timestamp = Date.now();
    var keytoregister = 'result_' + quizid+ '_ts' + timestamp + '_user_'+user;
    await db.put(keytoregister, info);
  }

  // auth attempt
  async regauthlog(uname, ipaddress, fp, ua, lang, authstatus) {
    var uname;
    var ipaddress;
    var fp;
    var ua;
    var lang;
    var authstatus;
    var timestamp = Date.now();
    var keytoregister = 'auth_' + uname + '_ts' + timestamp;
    var events = {
      "uname": uname,
      "ipaddress": ipaddress,
      "fp": fp,
      "ua": ua,
      "lang": lang,
      "timestamp": timestamp,
      "authstatus": authstatus
    };
    var toregevents = JSON.stringify(events);
    await db.put(keytoregister, toregevents);
  }
  // retreive a specific quiz
  async getQuiz(quizid) {
    var quizid;
    try {
      return await db.get('quiz_' + quizid);
    } catch (err) {
      //return '{"error":"'+err+'"}';
      return JSON.parse('{"error":"quiz not found"}');
    }
  }
  async getQuizimg(quizid) {
    var quizid;
    try {
      var thequizasked = await db.get('quiz_' + quizid);
      var parsedquiz = JSON.parse(thequizasked);
      parsedquiz[quizid].imagepresentation = 'imagepresentation/' + quizid;
      for (let i = 0; i < parsedquiz[quizid].allquestions.length; i++) {
        var questionnum = parsedquiz[quizid].allquestions[i].questionnumero;
        parsedquiz[quizid].allquestions[i].imagequestion = 'imagequestion/' + quizid + '/num/' + questionnum;
      }
      return JSON.stringify(parsedquiz);
    } catch (err) {
      //return '{"error":"'+err+'"}';
      return JSON.parse('{"error":"quiz not found"}');
    }
  }
  async save_Quiz(quizid, quiz_content) {
    var quizid;
    //console.log('the quizid from class Quiz().save_Quiz '+quizid)
    //	  db.put('name', 'dr22222222222222222', function (err) {
    //  if (err) return console.log('Ooops!', err) // some kind of I/O error
    //  3) Fetch by key
    //  })
    //  db.get('name', function (err, value) {
    //    if (err) return console.log('Ooops!', err) // likely the key was not found
    // Ta da!
    //    console.log('name= test1 : ' + value)
    //  })
    var quiztosave = 'quiz_' + quizid;
    var quizobj = '{"timestamp":"' + Date.now() + '","' + quizid + '":' + JSON.stringify(quiz_content) + '}';
    await db.put(quiztosave, quizobj);
    let results = await db.get(quiztosave)
    return results;
  }
  // admin function get all user
  async getalluser(limite) {
    const crs = await db.createReadStream({
      limit: limite,
      gte: 'user_',
      lte: 'user_~'
    });
    let count = {};
    crs.on("data", function(data) {
      var unevalue = 'the value'; //data.value
      count[data.key] = data.value;
      //count.push(thekey)
    });
    return new Promise(function(resolve, reject) {
      crs.on("end", function() {
        resolve(count);
      });
    });
  }
  // retreive all auth attempts
  async getallauth() {
    const crs = await db.createReadStream({
      limit: -1,
      gte: 'auth_',
      lte: 'auth_~'
    });
    let count = {};
    crs.on("data", function(data) {
      count[data.key] = data.value;
    });
    return new Promise(function(resolve, reject) {
      crs.on("end", function() {
        resolve(count);
      });
    });
  }
  // check if the user is authenticated via https://url/userauth/:fp
  async getuserauth(fingerprint) {
    var fingerprint;
    var authstatus = 'no';
    const crs = await db.createReadStream({
      limit: -1,
      reverse: true,
      gte: 'auth_',
      lte: 'auth_~'
    });
    let arraycounted = [];
    crs.on("data", function(data) {
      if (JSON.parse(data.value) && (JSON.parse(data.value)).fp === fingerprint) {
        var authstatus = (JSON.parse(data.value)).authstatus;
        arraycounted.push(authstatus);
        //console.log('user '+showfp.fp+' logged '+fingerprint+' authstatus '+authstatus);
      }
    });
    return new Promise(function(resolve, reject) {
      crs.on("end", function() {
        resolve({
          'response': arraycounted[0]
        });
      });
    });
  }
  //retreive all notif
  async getallnotif() {
    const crs = await db.createReadStream({
      limit: -1,
      gte: 'notif_',
      lte: 'notif_~'
    });
    let count = {};
    crs.on("data", function(data) {
      count[data.key] = data.value;
    });
    return new Promise(function(resolve, reject) {
      crs.on("end", function() {
        resolve(count);
      });
    });
  }
  // get registered user info
  async getuserinfo_(uname) {
    var quizid;
    try {
      return await db.get('user_' + uname);
    } catch (err) {
      return JSON.parse({
        "error": "user not found"
      });
    }
  }
  // register a new user (uname, userinfos)
  async register(uname, infos, ipaddress) {
    var uname;
    var infos;
    var ipaddress;
    const userinfosob = JSON.stringify(infos);
    const theuser = 'user_' + uname;
    var messagesuccess = '{"success":"enregistrementutilisateur"}';
    // check wether username (uname) exists 
    // return infos.email;
    var usertoput = JSON.parse('{"apikey":"' + infos.apikey + '","cpwd":"' + infos.cpwd + '","email":"' + infos.email + '","fingerprint":"' + infos.fingerprint + '","fname":"' + infos.fname + '","lname":"' + infos.lname + '","phne":"' + infos.phne + '","privkey":"' + infos.privkey + '","pwd":"' + infos.pwd + '","referer":"' + infos.referer + '","timestamp":"' + infos.timestamp + '","typeuser":"' + infos.typeuser + '","ua":"' + infos.ua + '","uname":"' + infos.uname + '","uuid":"' + infos.uuid + '","ip":"' + ipaddress + '"}');
    await db.put(theuser, JSON.stringify(usertoput));
    return messagesuccess;
  }
  async checkuserlogin(uname, pwd) {
    var pwd;
    var uname;
    const username = 'user_' + uname;
    var verifunamepwd = await db.get(username);
    var parsed = JSON.parse(verifunamepwd);
    if (parsed.pwd.toString() === pwd.toString()) {
      var msg = verifunamepwd;
      var events = {
        "event": "connecte",
        "status": "success",
        "before": "none",
        "after": "none"
      };
      var eventstoreg = JSON.stringify(events);
      await new Quiz().regnotif(uname, eventstoreg);
    } else {
      var msg = '{"error":"login failed"}';
    }
    return msg;
  }
}
module.exports = Quiz;
