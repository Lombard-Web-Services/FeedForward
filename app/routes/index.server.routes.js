const express = require('express');
const Ajv = require("ajv");
const ajv = new Ajv({
  strict: false,
  allowUnionTypes: true
});
module.exports = function(app) {
  jsonparser = express.json();
  app.use(jsonparser);
  app.use(express.urlencoded({
    extended: true
  }));
  // fin de la configuration des réponses json post
  // chargement de la view
  var index = require('../controllers/index.server.controller.js');
  // chargement des class api Quiz
  const Quiz = require('../controllers/db.controller.js');
  //authentification
  const schemalogin = {
    type: 'object',
    properties: {
      uname: {
        type: "string"
      },
      pwd: {
        type: "string"
      },
      ua: {
        type: "string"
      },
      fp: {
        type: "string"
      },
      lang: {
        type: "string"
      },
    },
    required: ['uname', 'pwd', 'ua', 'fp', 'lang'],
    additionalProperties: false
  };
  //save quiz results
  //arrresults = {'timestamp':timestamp,'intitule':titrequiz,'id':quizid,'resultats':resultquiz,'uname':uname};
  const savequizresults = {
    type: 'object',
    properties: {
      timestamp: {
        type: "integer"
      },
      intitule: {
        type: "string"
      },
      id: {
        type: "string"
      },
      resultats: {
        type: "string"
      },
      uname: {
        type: "string"
      },
    },
    required: ['timestamp', 'intitule', 'id', 'resultats', 'uname'],
    additionalProperties: false
  };
  // validation json schema
  const schemauser_ = {
    type: 'object',
    properties: {
      apikey: {
        type: "string"
      },
      cpwd: {
        type: "string"
      },
      email: {
        type: "string"
      },
      fingerprint: {
        type: "string"
      },
      fname: {
        type: "string"
      },
      lname: {
        type: "string"
      },
      lang: {
        type: "string"
      },
      phne: {
        type: "string"
      },
      privkey: {
        type: "string"
      },
      pwd: {
        type: "string"
      },
      referer: {
        type: "string"
      },
      timestamp: {
        type: "integer"
      },
      typeuser: {
        type: "string"
      },
      ua: {
        type: "string"
      },
      uname: {
        type: "string"
      },
      uuid: {
        type: "string"
      },
    },
    required: ['apikey', 'cpwd', 'email', 'fingerprint', 'fname', 'lname', 'phne', 'privkey', 'pwd', 'referer', 'timestamp', 'typeuser', 'ua', 'uname', 'uuid'],
    additionalProperties: false
  };
  // sub-schema validation
  var schema2 = {
    type: "object",
    minProperties: 1,
    patternProperties: {
      "^[0-9]{1,3}$": { //allow key only `integer` and length between 1 to 3
        type: "string"
      }
    }
  };
  const schema = {
    type: 'object',
    properties: {
      lang: {
        type: "string"
      },
      intitule: {
        type: "string"
      },
      description: {
        type: "string"
      },
      tagsinput: {
        type: "string"
      },
      timing: {
        type: "string"
      },
      youtubeurl: {
        type: "string"
      },
      categorie: {
        type: "string"
      },
      nombrequestions: {
        type: "integer"
      },
      imagepresentation: {
        type: "string"
      },
      allquestions: {
        type: "array",
        minItems: 1,
        items: {
          "oneOf": [{
            type: "object",
            properties: {
              questionnumero: {
                type: "integer"
              },
              typequiz: {
                enum: ["qcm", "qa"]
              },
              timequestion: {
                type: "string"
              },
              timequestionsec: {
                type: ["string", "number"],
                "minLength": 1,
                "minimum": 0
              },
              laquestion: {
                type: "string"
              },
              reponsesjustes: schema2,
              reponsesfausse: schema2,
              indice: {
                type: "string"
              },
              imagequestion: {
                type: "string"
              },
              questioncontent: {
                type: "string"
              }
            },
            required: ['questionnumero', 'typequiz', 'timequestion', 'timequestionsec', 'laquestion', 'indice', 'imagequestion', 'questioncontent']
          }]
        }
      },
      additionalProperties: false
    },
    required: ['lang', 'intitule', 'description', 'tagsinput', 'timing', 'youtubeurl', 'categorie', 'nombrequestions', 'allquestions']
  };

  function Arraytolimit(anarray, alimit, startpoint) {
    if (typeof startpoint == 'undefined') {
      var startpoint = 0;
    }
    var alimit;
    if (alimit > anarray.length) {
      var limit = anarray.length;
      //	console.log('la limite :'+limit)
    } else {
      var limit = alimit;
    }
    return anarray.splice(startpoint, parseInt(limit));
  }
  const escapeHTML = str => str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  } [tag]));
  const validate = ajv.compile(schema);
  const validateregister = ajv.compile(schemauser_);
  const validatequizresults = ajv.compile(savequizresults);
  // redirriger vers home avec ou sans menu supérieur
  //app.get('/', index.render);
  app.get('/get/:quizId/mode/:dataimg', async (req, res) => {
    const quizId = req.params.quizId;
    const dataorimg = req.params.dataimg;
    if (dataorimg === 'img') {
      var getquiz = await new Quiz().getQuizimg(quizId);
    } else {
      var getquiz = await new Quiz().getQuiz(quizId);
    }
    res.set({
      'Content-Type': 'application/json'
    });
    res.send(getquiz);
  });
  // get specific results of quiz by user
  //getresults/api/jltd66wsqjbg3d8mmr6o7oonym0kbfdq/user/bibi/
  app.get('/getresults/api/:privkey/user/:uname/:startpoint/:limit/?', async (req, res) => {
    const start = req.params.startpoint;
    var getlimit = req.params.limit;
    const privkey = req.params.privkey;
    const uname = req.params.uname;
    const userdata = await new Quiz().checkifuserexist(uname);
    if (start) {
      var startpoint = req.params.startpoint;
      //	console.log('la limite :'+limit)
    } else {
      var startpoint = 0;
      // console.log('la limite default:'+limit)
    }
    if (getlimit) {
      var limit = req.params.limit;
      //	console.log('la limite :'+limit)
    } else {
      var limit = 256;
      // console.log('la limite default:'+limit)
    }
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (typeof userdata !== false && privkeyjs == privkey) {
      var getquiz = await new Quiz().readallQuizimg(limit);
      // store the quizID from decoded uname into an array arrresults
      var arrresult = [];
      for (var i = 0; i < getquiz.length; i++) {
        for (var key in getquiz[i]) {
          if (key !== 'timestamp') {
            const quizIddecoded = key.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("");
            var trouveuname = quizIddecoded.substring(quizIddecoded.lastIndexOf("_") + 1, quizIddecoded.length);
            if (uname == trouveuname) {
              arrresult.push(key);
            }
          }
        }
      }
      var allresults = [];
      var allresultskeys = [];
      for (var j = 0; j < arrresult.length; j++) {
        //console.log('reading : '+arrresult[j]);
        var allresultsnew = await new Quiz().readallresults(arrresult[j]);
        var allresultsnewkey = await new Quiz().readallresultskeys(arrresult[j]);
        //console.log('timestamp : '+JSON.parse(allresultsnew).timestamp);
        //var thetime = new Date(parseInt(timec)).toLocaleString();
        allresults.push(allresultsnew);
        allresultskeys.push(allresultsnewkey);
      }
      // Debug clean all results
      //for(var k=0;k<allresultskeys.length;k++){
      //console.log('an array : '+allresultskeys[k]);
      //await new Quiz().delrecordsbykeys(allresultskeys[k]);
      //}
      var allresarray = [];
      var allres = {};
      var intarray = [];
      for (var z = 0; z < allresults.length; z++) {
        //console.log(z+' Longueur : '+allresults[z].length);
        //console.log(allresults[z]);
        var allquizresarray = [];
        let totalresquiz = 0;
        var arrallwin = [];
        for (var b = 0; b < allresults[z].length; b++) {
          totalresquiz++;
          var themonth = new Date(JSON.parse(allresults[z][b]).timestamp).getMonth() + 1;
          var thetime = new Date(parseInt(JSON.parse(allresults[z][b]).timestamp)).toLocaleString();
          var allwin = parseInt(JSON.parse(allresults[z][b]).winloose);
          arrallwin.push(allwin);
          var qid = JSON.parse(allresults[z][b]).id;
          var intitule = JSON.parse(allresults[z][b]).nomquiz;
          theallwon = arrallwin.reduce(function(a, b) {
            return a + b;
          }, 0);
          var datatoadd = {
            titre: intitule,
            win: theallwon,
            total: totalresquiz
          };
          var themontharray = {
            id: qid,
            [themonth]: {
              ...datatoadd
            }
          };
        }
        var lost = parseInt(totalresquiz) - parseInt(allwin);
        //console.log('id :'+qid+' win '+theallwon+' on '+totalresquiz+' for month '+themonth);	 
        //console.log(themontharray);	
        intarray.push(themontharray);
      }
      res.set({
        'Content-Type': 'application/json'
      });
      //res.send(toshow.splice(startpoint,parseInt(getlimit)));
      //res.send(allresults);
      //var test = [{"10":{"titre":"2em notif enregistrmene","win":1,"total":5},"id":"313633323737343539383036315f365f62696269"},{"9":{"titre":"2em notif enregistrmene","win":0,"total":4},"id":"313633323737343539383036315f365f62696269"},{"9":{"titre":"notif enregistrement quiz","win":2,"total":3},"id":"313633323530313632343937325f355f62696269"}];
      //res.send(test);
      var myresult = intarray.filter(function(e) {
        return e === 0 || e
      });
      res.send(myresult.splice(startpoint, parseInt(getlimit)));
    } else {
      res.set({
        'Content-Type': 'application/json'
      });
      var errormsg = {
        'error': 'invalid key'
      };
      res.send(errormsg);
    }
  });
  // Post request to save quiz results
  app.post('/saveresults/:quizid/key/:privkey/name/:uname', jsonparser, async (req, res) => {
    const quizresults = req.body;
    const valid = validatequizresults(req.body);
    const uname = req.params.uname;
    const quizid = req.params.quizid;
    const privkey = req.params.privkey;
    const checkifunameexist = await new Quiz().checkifuserexist(uname);
    const quiziddecoded = quizid.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("");
    var trouveuname = quiziddecoded.substring(quiziddecoded.lastIndexOf("_") + 1, quiziddecoded.length);
    const userdata = await new Quiz().checkifuserexist(uname);
    var getuserinfo = userdata;
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (!valid) {
      res.send(validatequizresults.errors);
    } else if (privkey !== privkeyjs) {
      var messageerreur = {
        "error": "userexistfail"
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(JSON.stringify(messageerreur));
    } else {
      //console.log('json \n '+JSON.stringify(userinfos));
      //var userinfo = await new Quiz().register(uname,userinfos,ipaddress);
      // récupération du titre du quiz
      var getquiz = await new Quiz().getQuizimg(quizid);
      // find the quiz title from quizid
      for (var key in JSON.parse(getquiz)) {
        if (key == quizid) {
          var intitule = JSON.parse(getquiz)[key].intitule.replace(/&#([0-9]+);/g, function(full, int) {
            return String.fromCharCode(parseInt(int));
          });
        }
      }
      // requete de notification event quiz creator et user    
      var quizcreatordata = await new Quiz().checkifuserexist(trouveuname);
      var resultatsplusnomquiz = ' : ' + intitule + ' ' + quizresults.resultats;
      // requete envoi notif au créateur du quiz
      //"userareussilequiz":" a passé votre quiz ",
      var events0 = {
        "event": "userareussilequiz",
        "status": "success",
        "before": uname,
        "after": resultatsplusnomquiz
      };
      var events1 = {
        "event": "userapassequiz",
        "status": "success",
        "before": uname,
        "after": resultatsplusnomquiz
      };
      var eventstoreg = JSON.stringify(events0);
      var eventstoreg1 = JSON.stringify(events1);
      var sauvegardenotifowner = await new Quiz().regnotif(trouveuname, eventstoreg);
      var sauvegardenotifuser = await new Quiz().regnotif(uname, eventstoreg1);
      var oneonone = quizresults.resultats.split('/');
      if (oneonone[0] == oneonone[1]) {
        var winloose = 1;
        var sendesultmsg = {
          'message': 'Bravo'
        };
      } else {
        var winloose = 0;
        var sendesultmsg = {
          'message': 'Oops'
        };
      }
      var info = {
        "id": quizid,
        "timestamp": Date.now(),
        "user": uname,
        "owner": trouveuname,
        "result": quizresults.resultats,
        "winloose": winloose,
        "nomquiz": intitule
      };
      var reginfo = JSON.stringify(info);
      var save_results = await new Quiz().regresult(quizid, uname, reginfo);
      // CORS
      res.send(sendesultmsg);
    }
  });
  // store all likes 
  // storagemod = check | add
  app.get('/likes/add/:quizid/name/:uname/key/:privkey', async (req, res) => {
    const privkey = req.params.privkey;
    const tquizid = req.params.quizid;
    const uname = req.params.uname;
    const mode = 'add';
    const userdata = await new Quiz().checkifuserexist(uname);
    var privkeyjs = (JSON.parse(userdata)).privkey;
    //console.log("add likes for  "+uname+' id '+tquizid);
    if (typeof userdata !== false && privkeyjs == privkey) {
      await new Quiz().reglike(uname, tquizid, '1');
      let countlike = await new Quiz().countalllikes(tquizid, uname, 'add');
      var newcount = countlike.length + 1;
      //console.log('count de like numero 2  : '+countlike.length);
      let myresult = {
        'thecount': countlike.length
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(myresult);
    } else {
      var errormsg = {
        'error': 'quiz or user not found for like add'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(errormsg);
    }
  });
  // remove a like
  app.get('/likes/rm/:quizid/name/:uname/key/:privkey', async (req, res) => {
    const privkey = req.params.privkey;
    const tquizid = req.params.quizid;
    const uname = req.params.uname;
    const userdata = await new Quiz().checkifuserexist(uname);
    const mode = 'rm';
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (typeof userdata !== false && privkeyjs == privkey) {
      let countlike = await new Quiz().countalllikes(tquizid, uname, mode);
      //if(countlike.length > 0){
      // like backdoor remove next 6 lines
      //for(var l = 0;l<countlike.length;l++){
      //var keysplit = countlike[l].split('_user_');
      //if(keysplit[1] == uname){
      //var dellikeawait= new Quiz().delrecordsbykey(countlike[l]);
      //}		
      //}
      //var resultafterdeletion = parseInt(countlike.length) -1;
      //}else{
      //var resultafterdeletion =0;
      //}
      let myresult = {
        'thecount': countlike.length
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(myresult);
    } else {
      var errormsg = {
        'error': 'quiz or user not found for like deletion'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(errormsg);
    }
  });
  // add a star
  app.get('/star/add/:quizid/name/:uname/key/:privkey/note/:note', async (req, res) => {
    const privkey = req.params.privkey;
    const tquizid = req.params.quizid;
    const uname = req.params.uname;
    const note = parseInt(req.params.note);
    const mode = 'add';
    const userdata = await new Quiz().checkifuserexist(uname);
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (typeof userdata !== false && privkeyjs == privkey) {
      //console.log('logging '+uname+' note '+note);
      let regstar = await new Quiz().regnote(uname, tquizid, note);
      let countstar = await new Quiz().countallstars(tquizid, uname, 'add');
      var thesum = countstar.reduce(function(countstar, b) {
        return countstar + b;
      }, 0);
      var rounded = Math.round(thesum / countstar.length);
      //console.log(countstar+' red '+thesum+' rounded '+rounded+'/5');
      let myresult = {
        'thescore': rounded + '/5'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(myresult);
    } else {
      var errormsg = {
        'error': 'quiz or user not found for star add'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(errormsg);
    }
  });
  // remove a star
  app.get('/star/rm/:quizid/name/:uname/key/:privkey/note/:note', async (req, res) => {
    const privkey = req.params.privkey;
    const tquizid = req.params.quizid;
    const uname = req.params.uname;
    const note = parseInt(req.params.note);
    const userdata = await new Quiz().checkifuserexist(uname);
    const mode = 'rm';
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (typeof userdata !== false && privkeyjs == privkey) {
      let countstar = await new Quiz().countallstars(tquizid, uname, mode);
      if (countstar.length > 0) {
        // star backdoor remove next 6 lines
        for (var l = 0; l < countstar.length; l++) {
          var keysplit = countstar[l].split('_user_');
          if (keysplit[1] == uname) {
            var delstarawait = new Quiz().delrecordsbykey(countstar[l]);
          }
        }
        var resultafterdeletion = parseInt(countstar.length) - 1;
      } else {
        var resultafterdeletion = 0;
      }
      let myresult = {
        'thecount': resultafterdeletion
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(myresult);
    } else {
      var errormsg = {
        'error': 'quiz or user not found for star deletion'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(errormsg);
    }
  });
  // get a specific quiz notification by privkey and uname
  app.get('/getnotif/api/:privkey/user/:uname/:startpoint/:limit/?', async (req, res) => {
    const start = req.params.startpoint;
    var getlimit = req.params.limit;
    const privkey = req.params.privkey;
    const uname = req.params.uname;
    const userdata = await new Quiz().checkifuserexist(uname);
    if (start) {
      var startpoint = req.params.startpoint;
      // console.log('la limite :'+limit)
    } else {
      var startpoint = 0;
      // console.log('la limite default:'+limit)
    }
    if (getlimit) {
      var limit = req.params.limit;
      // console.log('la limite :'+limit)
    } else {
      var limit = 256;
      // console.log('la limite default:'+limit)
    }
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (typeof userdata !== false && privkeyjs == privkey) {
      let toshow = await new Quiz().readallnotif(uname);
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(toshow.splice(startpoint, parseInt(getlimit)));
    } else {
      var retmsg = {
        'error': 'invalid parameter'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(retmsg);
    }
  });
  // delete a specific quiz by key quiz, privkey and uname
  app.get('/delquiz/:akey/api/:privkey/user/:uname', async (req, res) => {
    const akey = 'quiz_' + req.params.akey;
    const privkey = req.params.privkey;
    const uname = req.params.uname;
    const userdata = await new Quiz().checkifuserexist(uname);
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (typeof userdata !== false && privkeyjs == privkey) {
      var getquiz = await new Quiz().getQuizimg(req.params.akey);
      // find the quiz title from quizid
      for (var key in JSON.parse(getquiz)) {
        if (key == req.params.akey) {
          var intitule = ' ' + JSON.parse(getquiz)[key].intitule.replace(/&#([0-9]+);/g, function(full, int) {
            return String.fromCharCode(parseInt(int));
          });
        }
      }
      var events0 = {
        "event": "userasupprquiz",
        "status": "success",
        "before": uname,
        "after": intitule
      };
      var eventstoreg = JSON.stringify(events0);
      var sauvegardenotifowner = await new Quiz().regnotif(uname, eventstoreg);
      let todel = await new Quiz().delrecordsbykey(akey);
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(todel);
    } else {
      var retmsg = {
        'error': 'invalid parameter'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(retmsg);
    }
  });
  // get all quiz by username and apikey
  //http://localhost:3000/allquiz/0/mode/img/limit/12/user/testtest/api/1vhibzgiz3vjysrgmi2pr395b61suuah
  app.get('/allquiz/:startpoint?/mode/:dataimg/limit/:limit?/user/:username/api/:apikey', async (req, res) => {
    var getlimit = req.params.limit;
    var themode = req.params.dataimg;
    var startpoint = req.params.startpoint;
    var uname = req.params.username;
    var privkey = req.params.apikey;
    if (startpoint) {
      var startpoint = req.params.startpoint;
      // console.log('la limite :'+limit)
    } else {
      var startpoint = 0;
      // console.log('la limite default:'+limit)
    }
    if (getlimit) {
      var limit = req.params.limit;
      //	console.log('la limite :'+limit)
    } else {
      var limit = 256;
      // console.log('la limite default:'+limit)
    }
    const userdata = await new Quiz().checkifuserexist(uname);
    getuserinfo = userdata;
    //console.log('userdata : '+getuserinfo);
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (typeof userdata !== false && privkeyjs == privkey) {
      if (themode === 'img') {
        var getquiz = await new Quiz().readallQuizimg(limit);
      } else {
        var getquiz = await new Quiz().readallQuiz(limit);
      }
      var arrresult = [];
      for (var i = 0; i < getquiz.length; i++) {
        for (var key in getquiz[i]) {
          if (key !== 'timestamp' && key !== 'likes' && key !== 'stars') {
            //console.log('key in :'+key);
            const quizIddecoded = key.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("");
            var trouveuname = quizIddecoded.substring(quizIddecoded.lastIndexOf("_") + 1, quizIddecoded.length);
            if (uname == trouveuname) {
              var countlike = await new Quiz().countalllikes(key, uname, 'add');
              var countstar = await new Quiz().countallstars(key, uname, 'add');
              var thesum = countstar.reduce(function(countstar, b) {
                return countstar + b;
              }, 0);
              var rounded = Math.round(thesum / countstar.length);
              var likecountobj = {
                'likes': countlike.length
              };
              var starcountobj = {
                'stars': rounded
              };
              var newobjres = {
                ...getquiz[i],
                ...likecountobj,
                ...starcountobj
              };
              //console.log('found : '+getquiz[i]);
              arrresult.push(newobjres);
            }
          }
        }
      }
      var resultstosend = await Arraytolimit(arrresult, limit, startpoint);
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(resultstosend);
    } else {
      var errormsg = {
        'error': 'user doesn\'t exist'
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(errormsg);
    }
    //	var resultstosend = await Arraytolimit(getquiz,limit,startpoint);
    //  res.set({'Content-Type': 'application/json'});
    //  res.send(resultstosend);			
  });
  // get all results from quiz
  app.get('/alls/q/:searchterm/:startpoint?/mode/:dataimg/limit/:limit/', async (req, res) => {
    var getlimit = parseInt(req.params.limit);
    var themode = req.params.dataimg;
    var searchterm = decodeURIComponent(req.params.searchterm);
    //var st = searchterm.replace(/&#([0-9]+);/g, function(full, int) { return String.fromCharCode(parseInt(int))});
    //console.log('term found : '+st);
    var startpoint = req.params.startpoint;
    if (startpoint) {
      var startpoint = req.params.startpoint;
      //	console.log('la limite :'+limit)
    } else {
      var startpoint = 0;
      // console.log('la limite default:'+limit)
    }
    if (getlimit) {
      var limit = req.params.limit;
      //	console.log('la limite :'+limit)
    } else {
      var limit = 256;
      // console.log('la limite default:'+limit)
    }
    //let thecount = await new Quiz().getlatestrecordnamenumber();
    if (themode === 'img') {
      var getquiz = await new Quiz().readallQuizsimg(searchterm, limit);
    } else {
      var getquiz = await new Quiz().readallQuizs(limit, searchterm);
    }
    //let countlike = await new Quiz().countalllikes(key,uname,'add');
    var resultstosend = await Arraytolimit(getquiz, limit, startpoint);
    var rtsarr = [];
    for (var x = 0; x < resultstosend.length; x++) {
      for (var key in resultstosend[x]) {
        //console.log('entries : '+key+' found');
        if (key !== 'timestamp' && key !== 'likes') {
          var countlike = await new Quiz().countalllikes(key, '!!', 'add');
          var countstar = await new Quiz().countallstars(key, '!!', 'add');
          var thesum = countstar.reduce(function(countstar, b) {
            return countstar + b;
          }, 0);
          var rounded = Math.round(thesum / countstar.length);
          var likecountobj = {
            'likes': countlike.length
          };
          var starcountobj = {
            'stars': rounded
          };
          var newobjres = {
            ...resultstosend[x],
            ...likecountobj,
            ...starcountobj
          };
          //console.log('obj :'+newobjres);
          rtsarr.push(newobjres);
        }
      }
    }
    var resultstosend_ = await Arraytolimit(rtsarr, limit, startpoint);
    res.set({
      'Content-Type': 'application/json'
    });
    res.send(resultstosend_);
  });
  // get all results from quiz
  app.get('/all/:startpoint?/mode/:dataimg/limit/:limit?', async (req, res) => {
    var getlimit = req.params.limit;
    var themode = req.params.dataimg;
    var startpoint = req.params.startpoint;
    if (startpoint) {
      var startpoint = req.params.startpoint;
      //	console.log('la limite :'+limit)
    } else {
      var startpoint = 0;
      // console.log('la limite default:'+limit)
    }
    if (getlimit) {
      var limit = req.params.limit;
      //	console.log('la limite :'+limit)
    } else {
      var limit = 256;
      // console.log('la limite default:'+limit)
    }
    //let thecount = await new Quiz().getlatestrecordnamenumber();
    if (themode === 'img') {
      var getquiz = await new Quiz().readallQuizimg(limit);
    } else {
      var getquiz = await new Quiz().readallQuiz(limit);
    }
    //let countlike = await new Quiz().countalllikes(key,uname,'add');
    var resultstosend = await Arraytolimit(getquiz, limit, startpoint);
    var rtsarr = [];
    for (var x = 0; x < resultstosend.length; x++) {
      for (var key in resultstosend[x]) {
        //console.log('entries : '+key+' found');
        if (key !== 'timestamp' && key !== 'likes') {
          var countlike = await new Quiz().countalllikes(key, '!!', 'add');
          var countstar = await new Quiz().countallstars(key, '!!', 'add');
          var thesum = countstar.reduce(function(countstar, b) {
            return countstar + b;
          }, 0);
          var rounded = Math.round(thesum / countstar.length);
          var likecountobj = {
            'likes': countlike.length
          };
          var starcountobj = {
            'stars': rounded
          };
          var newobjres = {
            ...resultstosend[x],
            ...likecountobj,
            ...starcountobj
          };
          //console.log('obj :'+newobjres);
          rtsarr.push(newobjres);
        }
      }
    }
    var resultstosend_ = await Arraytolimit(rtsarr, limit, startpoint);
    res.set({
      'Content-Type': 'application/json'
    });
    res.send(resultstosend_);
  });
  // save a specific quiz by id
  app.post('/quiz/:quizId', jsonparser, async (req, res) => {
    const quiz = req.body;
    const valid = validate(req.body)
    const quizId = req.params.quizId;
    //const encoded = new Buffer(strtoencode).toString('hex'); 
    //const decoded = new Buffer(encoded, 'hex').toString(); 
    const quizIddecoded = quizId.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("");
    var trouveuname = quizIddecoded.substring(quizIddecoded.lastIndexOf("_") + 1, quizIddecoded.length);
    //console.log('le id du quiz décodé est  : '+quizIddecoded+' le uname :'+trouveuname);
    if (!valid) {
      res.send(validate.errors)
    } else {
      var todos = await new Quiz().save_Quiz(quizId, quiz);
      var msgnomquiz = ' : ' + quiz.intitule;
      var events = {
        "event": "quizenregistre",
        "status": "success",
        "before": trouveuname,
        "after": quiz.intitule
      };
      var eventstoreg = JSON.stringify(events);
      var sauvegardenotif = await new Quiz().regnotif(trouveuname, eventstoreg);
      //lesresultats = quizId+' |  '+quiz.allquestions[0].reponsesjuste[0];
      //return res.send(lesresultats);
      //console.log(quizId);
      //console.log(JSON.stringify(req.body));
      //res.json(req.body);
      //res.send('valid '+lesresultats);
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(JSON.parse(todos, null, 4));
    }
  });
  //inscription	           
  app.post('/register/:uname', jsonparser, async (req, res) => {
    const userinfos = req.body;
    const valid = validateregister(req.body)
    const uname = req.params.uname;
    const ipaddress = req.ip;
    const checkifunameexist = await new Quiz().checkifuserexist(uname);
    if (!valid) {
      res.send(validateregister.errors);
    } else if (checkifunameexist) {
      var messageerreur = {
        "error": "userexistfail"
      };
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(JSON.stringify(messageerreur));
    } else {
      //console.log('json \n '+JSON.stringify(userinfos));
      var userinfo = await new Quiz().register(uname, userinfos, ipaddress);
      // CORS
      res.send(userinfo);
    }
  });
  // admin function delete a user
  //http://localhost:3000/deluser/bibi/callback/123
  app.get('/deluser/:uname', async (req, res) => {
    let uname = req.params.uname;
    var fulluname = 'user_' + uname;
    var del = await new Quiz().delrecordsbykey(fulluname, callback);
    res.set({
      'Content-Type': 'application/json'
    });
    res.send(req.query.callback + '(' + del + ');');
  });
  // admin function get all user registered	
  //http://localhost:3000/getalluser/10/callback/123456
  app.get('/getalluser/:limit?', async (req, res) => {
    var callback = req.params.callback;
    if (callback) {
      callback = req.params.callback;
    } else {
      callback = 'callback';
    }
    let limite = req.params.limit;
    if (limite) {
      var limit = req.params.limit;
    } else {
      var limit = -1;
    }
    var getallusers = await new Quiz().getalluser(limit);
    res.set({
      'Content-Type': 'application/json'
    });
    res.send(req.query.callback + '(' + JSON.stringify(getallusers) + ');');
  });
  //http://localhost:3000/getallauth/
  app.get('/getallauth/', async (req, res) => {
    var getallauth = await new Quiz().getallauth();
    res.set({
      'Content-Type': 'application/json'
    });
    res.send(JSON.stringify(getallauth));
  });
  // check user auth from fingerprint yes or no
  //http://localhost:3000/userauth/
  app.get('/userauth/:userauth', async (req, res) => {
    let testfingerprint = req.params.userauth;
    var getuserauth = await new Quiz().getuserauth(testfingerprint);
    res.set({
      'Content-Type': 'application/json'
    });
    res.send(JSON.stringify(getuserauth));
  });
  // retreive user infos
  //http://localhost:3000/getuser/bibi/key/1vhibzgiz3vjysrgmi2pr395b61suuah/callback/bb
  app.get('/getuser/:uname/key/:privkey', async (req, res) => {
    var uname = req.params.uname;
    var privkey = req.params.privkey;
    const userdata = await new Quiz().checkifuserexist(uname);
    var getuserinfo = userdata;
    var privkeyjs = (JSON.parse(userdata)).privkey;
    if (privkeyjs == privkey) {
      res.set({
        'Content-Type': 'application/json'
      });
      var msg = getuserinfo;
      res.send(req.query.callback + '(' + msg + ');');
    } else {
      res.set({
        'Content-Type': 'application/json'
      });
      var errormsg = '{"error":"invalidprivkey"}';
      res.send(req.query.callback + '(' + errormsg + ');');
    }
  });
  // authentification
  const validatelogin = ajv.compile(schemalogin);
  app.post('/login', jsonparser, async (req, res) => {
    const contentlogin = req.body;
    const validlogin = validatelogin(req.body);
    const ipaddress = req.ip;
    const ua = contentlogin.uname;
    var authstatus = 'no';
    //const Timestamp = req.params.Timestamp; 
    if (!validlogin) {
      res.send(validatelogin.errors);
    } else {
      //login valide on enregistre la tentative de connection
      const uname = contentlogin.uname;
      const pwd = contentlogin.pwd;
      const ua = contentlogin.ua;
      const fp = contentlogin.fp;
      const lang = contentlogin.lang;
      var checkuserexist = await new Quiz().checkifuserexist(uname);
      if (checkuserexist) {
        var chkuser = await new Quiz().checkuserlogin(uname, pwd);
        var msg = chkuser;
        var jsonchk = JSON.parse(chkuser);
        if (pwd === jsonchk.cpwd) {
          var authstatus = 'yes';
        }
        await new Quiz().regauthlog(uname, ipaddress, fp, ua, lang, authstatus);
      } else {
        var msg = '{"error":"user doesnt exist"}';
      }
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(msg);
    }
  });
  // loading imagepresentation
  app.get('/imagepresentation/:idimage', async (req, res) => {
    var idimagedepresentation = req.params.idimage;
    let getquiz = await new Quiz().getQuiz(idimagedepresentation);
    try {
      let theob = JSON.parse(getquiz);
      var kts = req.params.idimage.toString();
      var readaquiz = require('../controllers/readaquiz.controller');
      var subvar = 'imagepresentation';
      //console.log('key found : '+kts);
      var globtest = theob[kts].imagepresentation;
      var resimg = await readaquiz.imagepres(kts, subvar, theob);
      let base64ContentArray = resimg.split(",")
      let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0]
      var image = resimg.substring(resimg.lastIndexOf(',') + 1, resimg.length);
      const file = Buffer.from(image, 'base64');
      res.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': file.length,
        'Cache-control': 'public, max-age=345600',
        'Expires': new Date(Date.now() + 2592000000*30).toUTCString()
      });
      //console.log(loadimage);
      res.end(file);
    } catch (e) {
      res.set({
        'Content-Type': 'application/json'
      });
      var errormsg = '{"error":"bad image"}';
      res.send(errormsg);
    }
  });
  //loading image question
  app.get('/imagequestion/:idimage/num/:questionnumero', async (req, res) => {
    var idimage = req.params.idimage;
    var questionnumero = req.params.questionnumero;
    let getquiz = await new Quiz().getQuiz(idimage);
    try {
      let theob = JSON.parse(getquiz);
      var kts = req.params.idimage.toString();
      var readaquiz = require('../controllers/readaquiz.controller');
      //console.log('key found : '+kts);
      var resimg = await readaquiz.questnum(kts, questionnumero, theob);
      let base64ContentArray = resimg.split(",")
      let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0]
      var image = resimg.substring(resimg.lastIndexOf(',') + 1, resimg.length);
      const file = Buffer.from(image, 'base64');
      res.writeHead(200, {
        'Content-Type': mimeType,
        'Content-Length': file.length,
        'Cache-control': 'public, max-age=345600',
        'Expires': new Date(Date.now() + 2592000000*30).toUTCString()
      });
      res.end(file);
    } catch (e) {
      res.set({
        'Content-Type': 'application/json'
      });
      var errormsg = '{"error":"bad image"}';
      res.send(errormsg);
    }
  });
  /////////////////////////////////////////////////////////////
  // view
  /////////////////////////////////////////////////////////////	
  app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /css/\nDisallow: /js/\nDisallow: /images/\nDisallow: /create-quiz\nDisallow: /fonts/\nDisallow: /myquiz\nDisallow: /mynotifications\nDisallow: /stats\nAllow: *");
	});
	
  //A2HS
  app.get('/manifest.json', function (req, res) {
    res.type('application/json');
    mymanifest = {    'short_name': 'FeedForward',    'name': 'FeedForward',	'description': 'The first platform for e-learning with Quiz. The best AI powered quiz Social Network. Lets get started by passing a quiz or create your own one here. Enjoy using this app',    'icons': [ {'src': 'images/fav/android-chrome-36x36.png','sizes': '36x36','type': 'image/png' }, {'src': 'images/fav/android-chrome-48x48.png','sizes': '48x48','type': 'image/png' }, {'src': 'images/fav/android-chrome-72x72.png','sizes': '72x72','type': 'image/png' }, {'src': 'images/fav/android-chrome-96x96.png','sizes': '96x96','type': 'image/png' }, {'src': 'images/fav/android-chrome-144x144.png','sizes': '144x144','type': 'image/png' }, {'src': 'images/fav/android-chrome-192x192.png','sizes': '192x192','type': 'image/png' }, {'src': 'images/fav/android-chrome-256x256.png','sizes': '256x256','type': 'image/png' }, {'src': 'images/fav/android-chrome-384x384.png','sizes': '384x384','type': 'image/png' }, {'src': 'images/fav/android-chrome-512x512.png','sizes': '512x512','type': 'image/png' }    ],    'scope': '/',    'theme_color': '#ffffff',    'background_color': '#ffffff',	'theme_color': '#ffffff',    'start_url': 'https://feedforward.ml/login',    'display': 'standalone',	'orientation': 'portrait',	'lang': '',	'dir': ''};
    res.send(JSON.stringify(mymanifest, null, "  "));
   });

    app.get('/sw.js', function (req, res) {
    res.type('application/javascript');
    myswjs = 'const version="1.00",preCache="PRECACHE-1.00",cacheList=["/"];self.addEventListener("install",function(e){self.skipWaiting(),caches.open(preCache).then(e=>{e.addAll(cacheList)})}),self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(e=>{e.forEach(e=>{e.indexOf("1.00")<0&&caches.delete(e)})}))}),self.addEventListener("fetch",function(e){e.respondWith(caches.match(e.request).then(function(t){return t||fetch(e.request)}))});';
    res.send(myswjs);
   });
  //Front
  var index = require('../controllers/index.server.controller');
  app.get('/', index.render);
  var theindex = require('../controllers/login.server.controller');
  app.get('/login', theindex.render);
  // page home moteur de recherche de quiz
  //var home = require('../controllers/home.server.controller');
  //app.get('/home', home.render);	
  app.get('/home/:search?', async (req, res) => {
    var getquiz2 = await new Quiz().readallQuizimg();
    var getquiz = await Arraytolimit(getquiz2, 12);
    var keyzarray = [];
    var mycountoflikes = [];
    var mycountofstars = [];
    var quizidarray = [];
    var getquizzesparsed = getquiz;
    //console.log(JSON.stringify(getquiz));
    var u = 0;
    for (var key in getquizzesparsed) {
      keyg = getquizzesparsed[key];
      for (thekey in keyg) {
        if (thekey !== 'timestamp') {
          z = u++;
          quizidarray.push(thekey);
          keyzarray.push(thekey);
          let uname = "!!";
          let mode = "add";
          let countlike = await new Quiz().countalllikes(thekey, uname, mode);
          //console.log("id "+z+" "+thekey+' likes : '+countlike.length);
          var countedlike = countlike.length;
          mycountoflikes.push(countedlike);
          let countstar = await new Quiz().countallstars(thekey, '!!', 'add');
          var thesum = countstar.reduce(function(countstar, b) {
            return countstar + b;
          }, 0);
          var rounded = Math.round(thesum / countstar.length);
          mycountofstars.push(rounded);
        }
      }
    }
    //for (var x=0; x<keyzarra
    res.render("home", {
      quiz: getquiz,
      title: 'feedforward',
      allkeys: keyzarray,
      quizid: quizidarray,
      likecount: mycountoflikes,
      starscount: mycountofstars
    });
  });
  var mynotifications = require('../controllers/mynotifications.server.controller');
  app.get('/mynotifications', mynotifications.render);
  var stats = require('../controllers/stats.server.controller');
  app.get('/stats', stats.render);
  var senregistrer = require('../controllers/senregistrer.server.controller');
  app.get('/senregistrer', senregistrer.render);
  var create_quiz = require('../controllers/create-quiz.server.controller');
  app.get('/create-quiz', create_quiz.render);
  var myquiz = require('../controllers/myquiz.server.controller');
  app.get('/myquiz', myquiz.render);
  // page quiz 
  var quiz = require('../controllers/q.server.controller');
  // app.get('/q', quiz.render);	
  app.get('/q:quizid?', async (req, res) => {
    var quizid = req.params.quizid;
    var getquiz = await new Quiz().getQuizimg(quizid);
    if (!getquiz["error"]) {
      //console.log(getquiz[1]);
      for (var key in JSON.parse(getquiz)) {
        if (key !== 'timestamp' && key !== 'likes' && key !== 'stars') {
          var mydata = JSON.parse(getquiz)[key];
        } else {
          //var theDate = new Date(Date(JSON.parse(getquiz)['timestamp'] * 1000));
          var theDate = new Date(parseInt(JSON.parse(getquiz).timestamp));
          var dateString = theDate.toLocaleString();
        }
        //console.log(getquiz[key]);
      }
      let countstar = await new Quiz().countallstars(quizid, '!!', 'add');
      var thesum = countstar.reduce(function(countstar, b) {
        return countstar + b;
      }, 0);
      var rounded = Math.round(thesum / countstar.length);
      let countlike = await new Quiz().countalllikes(quizid, '!!', 'add');
      //console.log("id "+quizid+' likes : '+countlike);
      const quizIddecoded = quizid.split(/(\w\w)/g).filter(p => !!p).map(c => String.fromCharCode(parseInt(c, 16))).join("");
      var trouveuname = quizIddecoded.substring(quizIddecoded.lastIndexOf("_") + 1, quizIddecoded.length);
      //console.log('quiz found : '+JSON.stringify(mydata)+' and the date '+dateString);
      res.render("quiz", {
        quiz: mydata,
        title: 'feedforward quiz',
        datequiz: theDate,
        uname: trouveuname,
        starnum: rounded,
        likecount: countlike.length,
        myid: quizid
      });
    } else {
      res.set({
        'Content-Type': 'application/json'
      });
      var errormsg = '{"error":"Quiz not found"}';
      res.send(errormsg);
    }
  });
};
