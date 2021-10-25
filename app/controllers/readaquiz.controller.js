module.exports = {
    imagepres: function(avar,a2var,anobject) {
        return anobject[avar][a2var];
    },
    //idimage,allquestions, numero de la question (exemple : 1)
   questnum: function(avar,a3var,anobject){
         var allquestionsobject =anobject[avar].allquestions;
         var questionimageb64 = false;
         for (i=0;i<allquestionsobject.length;i++){
		  if(allquestionsobject[i].questionnumero == a3var){
		   var questionimageb64 = allquestionsobject[i].imagequestion;
		  }
		 }
         return questionimageb64;
    },
    rwimagepres: function(avar,a2var,anobject) {
        return anobject[avar][a2var];
    },
   rwquestnum: function(avar,a3var,anobject){
         var allquestionsobject =anobject[avar].allquestions;
         var questionimageb64 = false;
         for (i=0;i<allquestionsobject.length;i++){
		  if(allquestionsobject[i].questionnumero == a3var){
		   var questionimageb64 = allquestionsobject[i].imagequestion;
		  }
		 }
         return questionimageb64;
    }
};

 
