module.exports = {
    lang: function(avar,a2var) {
const langageObject = {
'mots_GB': {
  "creerlequiz":"Create the quiz",
  "creerunquiz":"Create a quiz",
  "ajouterquestion":"Add questions",
  "testerquiz":"Test the quiz",
  "enregistrement":"Save",
  "inputintitule":"Quiz title...",
  "textareadescription":"Describe the quiz in a few words, 500 chars allowed.",
  "boutonsuivant":"Next",
  "boutonprecedent":"Previous",
  "h2creerlequiz":"Create the quiz",
  "steps1on4":"Step 1 / 4",
  "steps2on4":"Step 2 / 4",
  "steps3on4":"Step 3 / 4",
  "steps4on4":"Step 4 / 4",
  "labelimagedepresentation":"Main picture : *",
  "selectionimagepresentation":"Select a file to upload (PNG or JPG)",
  "nofileselectedimagedepresentation":"No file selected.",
  "intitulelabel":"Title: *",
  "descriptionlabel":"Sum up : *",
  "duree":"Duration: (0 = ∞)",
  "youtubeurl":"Youtube URL : (not mandatory)",
  "labelcategory":"Category : *",
  "inputcategory":"Type the category...",
  "tagslabel":"tag(s) : (not mandatory)",
  "inputtags":"Type enter to add",
  "informations":"Infos : ",
  "dureequestions":"Duration: (hh:mm:ss)",
  "questionx":"Question 1",
  "questionx0":"Question",
  "questionindicelabel":"Question : *([I]Hint[/I])",
  "indicebutton":"[Hint]",
  "question1textarea":"Add your question answere here.. 1000 chars allowed",
  "imagedelaquestionlabel":"Question's picture :",
  "success":"Saved",
  "finalstep":"Final step:",
  "messageduree1":"The question's duration ",
  "messageduree2":" is too long compared to the initial ",
  "messageduree3":".",
  "messageordrecroissant":"The questions can be added by ascending order only.",
  "messageordredecroissant":"The questions can be deleted by descending order only.",
  "messagequestionparse1":"The question ",
  "messagequestionparse2":" must contain :<br>[Q]A question[/Q]<br>[I]eventually an hint[/i]<br>[RF]one or multiple wrong answer(s), [/RF]<br>[RJ]One or multiple true answer(s).[/RJ]<br>",
  "totalcorrect":"Total Correct:",
  "vosreponses":"Your answer",
  "resultat":"Results",
  "reponsesjustes":"Right answer",
  "echec":"Fail",
  "succes":"Success",
  "titreenregistrezvous":"Register",
  "account":"Create an account",
  "quizzysubtitle":"To use quiz",
  "personal":"Infos",
  "Status":"Status",
  "confirm":"Finish",
  "compteutilisateur":"User account",
  "steps1sur4":"Step 1 / 4",
  "steps2sur4":"Step 2 / 4",
  "steps3sur4":"Step 3 / 4",
  "steps4sur4":"Step 4 / 4",
  "email":"Email : *",
  "emailplaceholder":"Type your email address...",
  "nomdutilisateur":"Username : *",
  "nomdutilisateurplaceholder":"Type your username",
  "motdepasse":"Password : *",
  "motdepasseplaceholder":"Type your password",
  "confirmezvotremotdepasse":"Confirm : *",
  "confirmezvotremotdepasseplaceholder":"Confirm your password",
  "titreinformations":"Infos :",
  "prenomfield":"First name : *",
  "prenomplaceholder":"Type your first name...",
  "nomfield":"Last name : *",
  "nomfieldplaceholder":"Type your last name",
  "numerodetelfield":"Phone number : *",
  "numerodetelfieldplaceholder":"Type your phone numbers...",
  "statusutilisateurtitre":"User status :",
  "utilisateurcreateur":"User / Quiz creator",
  "etapefinale":"Final step :",
  "successenregistrementutilisateur":"User registered successfully",
  "nomdutilisateurincorrect":"Wrong username",
  "motdepasseincorrect":"Wrong password",
  "motdepassenonidentique":"Password are not equal",
  "adresseemailincorrecte":"Wrong email",
  "prenomincorrect":"Wrong first name",
  "nomincorrect":"Wrong last name",
  "numdetelchiffre":"The phone number must contains only digits",
  "seulslettresnombresacceptes":"Only letters, numbers and _ are allowed",
  "titrerequis":"Title required",
  "descriptionrequise":"Description required",
  "dureesuperieurzero":"The duration must be higher than 0",
  "categorierequise":"Category required",
  "cliquezicirechargerpage":"Click here to reload",
  "selectionnezfichier":"Select a file to upload",
  "erreur":"Error :",
  "urlinvalide":"Invalid URL",
  "uniquementdesnombres":"Numbers only",
  "telvalide":"Please fill a valid phone number ",
  "creditcardinvalide":"Invalid credit card number",
  "motdepassepasidentiques":"Password are not the same",
  "pasplusdecaracteres0":"Do not type more than ",
  "pasplusdecaracteres1":"chars",
  "aumoinsxcaracteres":" at least",
  "betweenxandxchars0":"Between ",
  "betweenxandxchars1":" and ",
  "betweenxandxchars2":" chars required",
  "valeurentre0":"A value between ",
  "valeurentre1":" and ",
  "valeurentre2":" is required",
  "inferieurouegal":"Value required lower or equal to ",
  "superieurouegal":"Value required higher or equal to ",
    "bienvenue":"Welcome ",
    "suiviquiz":"You have tryied the quiz : ",
    "asuivivotrequiz":" tryied your quiz",
	"vousvousetesinscrit":"Subscribed",
	"likevotrequiz":" like your quiz ",
	"avezlikelequiz":"You liked the quiz ",
	"finilikelequiz":"You disliked the quiz ",
	"userfinilikelequiz":" dislike your quiz ",
	"vousavezcreerunquiz":"You have created the quiz ",
	"useracreeunquiz":" created a quiz",
	"areussilequiz":"You passed successfilly the quiz ",
	"userareussilequiz":" passed your quiz ",
	"abonnequiz":" follow",
	"abonnequiz":" followed",
	"signalezquiz":"You have reported the quiz ",
	"signalementcertif":"You have reported the certificate ",
	"signalementquiz":"Your quiz ",
	"signalementquiz2":" has been reported",
	"creecertifmessage":"You have created the certificate ",
	"creecertif":"You have created the certificate for the/se quiz ",
	"quizpassed":"Bravo ",
	"quizpassed1":" you have earned a certificate : ",
	"quizpassed2":"for the quiz ",
	"quizechec":"Your points ",
	"quizechec1":" doesn't permit to earn the certificate ",
	"quizechecerror":"Minimal results expected :",
	"deconnecte":"You have been disconnected",
	"connecte":"Connected",
	"messagepartage":"You shared ",
	"messagepartagecertif":"You shared the certificate ",
	"deconnexion":"Disconnect",
	"login":"Log In",
	"aide":"Help",
	"credits":"Greetings :",
	"renvoipassword":"Send your password",
	"supprimercompte":"Delete your account",
	"profiluser":"User profile",
	"mesquiz":"My Quiz",
	"lesquiz":"Quiz",
	"meslike":"Quiz liked",
	"mescertif":"My certificates",
	"lescertif":"Certificates",
	"certifreussis":"Passed certificates",
	"certifechec":"Failed certificates",
	"search":"Search",
	"pardate":"By date",
	"resultrecherche":"result(s)",
	"recent":"recent",
	"trouve":"found",
	"recents":"recent",
	"trouves":"founds",
	"aucunresultats":"No results found",
	"cleapi":"API Key",
	"clesecrete":"Private Key",
	"notifications":"Notifications",
	"chargement":"Loading",
	"journaldeconnexion":"Log",
	"bestquiz":"Best quiz",
	"stats":"Stats",
	"mystats":"My stats",
	"lesmieuxnote":"Top rated",
	"limite":"Limit",
	"parpages":"per page(s)",
	"tri":"sort",
	"modif":"Modify",
	"edit":"Edit",
	"supprimer":"Delete",
	"ajouter":"Add",
	"affichage":"Display",
	"pleinecran":"Fullscreen",
	"zoom":"Zoom",
	"partager":"Share",
	"partagersur":"Share on sur ",
	"exporter":"Export",
	"import":"Import",
	"sync":"Sync",
	"syncro":"Syncing",
	"syncsuccess":"Sync success",
	"importsuccess":"Import success",
	"syncsuccess":"Synchronized successfully",
	"quizlesmieuxnotes":"Top rated quiz",
	"quizmoinbiennotes":"Lowest rated quiz",
	"quizlesplusdifficile":"Hardest quiz",
	"quizlesplusfacile":"Easyiest quiz",
	"categorieplusfrequentee":"Most frequented categories",
	"tagsplusutilises":"Most used tags",
	"classement":"rank",
	"classements":"ranking",
	"rechargerlapage":"refresh",
	"reessayer":"Retry",
	"retake":"Retake",
},
'mots_IL': {
  "creerlequiz":"ליצור את השאלון",
  "creerunquiz":"ליצור שאלון",
  "ajouterquestion":"להוסיף שאלות",
  "testerquiz":"לבדוק את השאלון",
  "enregistrement":"שמירה",
  "inputintitule":"כותרת השאלון",
  "textareadescription":"תארו את השאלון בכמה מילים, עד 500 תווים״",
  "boutonsuivant":"קדימה",
  "boutonprecedent":"אחורה",
  "h2creerlequiz":"ליצור את השאלון",
  "steps1on4":"שלב 1 / 4",
  "steps2on4":"שלב 2 / 4",
  "steps3on4":"שלב 3 / 4",
  "steps4on4":"שלב 4 / 4",
  "labelimagedepresentation":"תמונת כותרת : *",
  "selectionimagepresentation":"בחרו תמונה להעלות (PNG, JPG)",
  "nofileselectedimagedepresentation":"עדיין לא נבחר מסמך",
  "intitulelabel":"כותרת: *",
  "descriptionlabel":"תיאור : *",
  "duree":"זמן מוקצה : (0 = ∞)",
  "youtubeurl":"URL Youtube : (אופציונאלי)",
  "labelcategory":"קטגוריה: *", 
  "inputcategory":"הזן את הקטגוריה",
  "tagslabel":"תוויות - (אופציונלי)",
  "inputtags":"הקש enter לאישור",
 "informations":"מידע :",
  "dureequestions":"זמן מוקצה לשאלה : (hh:mm:ss)",
  "questionx":"שאלה 1",
  "questionx0":"שאלה",
  "questionindicelabel":"שאלה: *([I]רמז[/I])",
  "indicebutton":"[רמז]",
"question1textarea":"הוספיו שאלה פה, עד 1000 תווים",
  "imagedelaquestionlabel":"תמונה לשאלה :",
  "success":"שמור",
  "finalstep":"שלב אחרון:",
  "messageduree1":"הזמן המוקצה לשאלות ",
  "messageduree2":" ארוך מדי  ביחס לזמן הכולל ",
  "messageduree3":".",
  "messageordrecroissant":"השאלות מתווספות לפי סדר עולה.",
  "messageordredecroissant":"ניתן להסיר שאלות לפי סדר יורד בלבד",
  "messagequestionparse1":"השאלה ",
  "messagequestionparse2":" חייבת להכיל :<br>[Q]שאלה[/Q]<br>[I]רמז (אפשרי)[/i]<br>[RF]תשובה שגויה אחת או יותר [/RF]<br>[RJ]תשובה אחת נכונה או יותר.[/RJ]<br>",
  "totalcorrect":"סיכום תשובות נכונות:",
"vosreponses":"תשובותיכם",
  "resultat":"תוצאות",
  "reponsesjustes":"תשובות נכונות",
  "echec":"כשלון",
  "succes":"הצלחה",
  "titreenregistrezvous":"New user",
  "account":"Create an account",
  "quizzysubtitle":"To use quiz",
  "personal":"Infos",
  "Status":"Status",
  "confirm":"finish",
  "compteutilisateur":"User account",
  "steps1sur4":"Step 1 / 4",
  "steps2sur4":"Step 2 / 4",
  "steps3sur4":"Step 3 / 4",
  "steps4sur4":"Step 4 / 4",
  "email":"Email : *",
  "emailplaceholder":"Type your email address...",
  "nomdutilisateur":"Username : *",
  "nomdutilisateurplaceholder":"Type your username",
  "motdepasse":"Password : *",
  "motdepasseplaceholder":"Type your password",
  "confirmezvotremotdepasse":"Confirm : *",
  "confirmezvotremotdepasseplaceholder":"Confirm your password",
  "titreinformations":"Infos :",
  "prenomfield":"First name : *",
  "prenomplaceholder":"Type your first name...",
  "nomfield":"Last name : *",
  "nomfieldplaceholder":"Type your last name",
  "numerodetelfield":"Phone numbers : *",
  "numerodetelfieldplaceholder":"Type your phone numbers...",
  "statusutilisateurtitre":"User status :",
  "utilisateurcreateur":"User / Quiz creator",
  "etapefinale":"Final step :",
  "successenregistrementutilisateur":"User registered successfully",
  "nomdutilisateurincorrect":"Nom d'utilisateur incorrect",
  "motdepasseincorrect":"Mot de passe incorrect",
  "motdepassenonidentique":"Mot de passe non identique",
  "adresseemailincorrecte":"Adresse e-mail incorrecte",
  "prenomincorrect":"Prénom incorrect, vous devez le saisir",
  "nomincorrect":"Nom incorrect, vous devez le saisir",
  "numdetelchiffre":"Le numéro de téléphone doit contenir uniquement des chiffres",
  "seulslettresnombresacceptes":"Seules les lettres, nombres et _ sont acceptés.",
  "titrerequis":"Titre requis",
  "descriptionrequise":"Description requise",
  "dureesuperieurzero":"La dur&eacute;e doit &ecirc;tre supérieure à 0",
  "categorierequise":"Cat&eacute;gorie requise",
  "cliquezicirechargerpage":"Cliquez ici pour recharger la page",
  "selectionnezfichier":"Sélectionnez un fichier à mettre en ligne",
  "erreur":"Erreur :",
  "urlinvalide":"Veuillez saisir une URL valide.",
  "uniquementdesnombres":"Uniquement des nombres",
  "telvalide":"Veuillez saisir un numéro de téléphone valide.",
  "creditcardinvalide":"Numéro de carte de crédit invalide",
  "motdepassepasidentiques":"Mot de passe pas identique",
  "pasplusdecaracteres0":"Ne pas saisir plus de ",
  "pasplusdecaracteres1":"caractères.",
  "aumoinsxcaracteres":" caractères minimum.",
  "betweenxandxchars0":"Entre ",
  "betweenxandxchars1":" et ",
  "betweenxandxchars2":" caractères requis.",
  "valeurentre0":"Une valeur entre ",
  "valeurentre1":" et ",
  "valeurentre2":" est requise.",
  "inferieurouegal":"Valeur requise inférieur ou égale à ",
  "superieurouegal":"Valeur requise supérieur ou égale à "
},
'mots_FR' : {
  "creerlequiz":"Créer le quiz",
  "creerunquiz":"Créer un quiz",
  "ajouterquestion":"Ajouter des questions",
  "testerquiz":"Tester le quiz",
  "enregistrement":"Enregistrement",
  "inputintitule":"Intitulé du quiz",
  "textareadescription":"Décrivez le quiz en quelques mots, 500 caractères autorisés...",
  "boutonsuivant":"Suivant",
  "boutonprecedent":"Précédent",
  "h2creerlequiz":"Créer le quiz",
  "steps1on4":"Étape 1 / 4",
  "steps2on4":"Étape 2 / 4",
  "steps3on4":"Étape 3 / 4",
  "steps4on4":"Étape 4 / 4",
  "labelimagedepresentation":"Image de présentation : *",
  "selectionimagepresentation":"Sélectionner une image à uploader (PNG, JPG)",
  "nofileselectedimagedepresentation":"Aucun fichier sélectionné pour le moment.",
  "intitulelabel":"Intitulé : *",
  "descriptionlabel":"Description : *",
  "duree":"Durée : (0 = ∞)",
  "youtubeurl":"URL Youtube : (facultatif)",
  "labelcategory":"Catégorie : *",
  "inputcategory":"Saisir la catégorie",
  "tagslabel":"tag(s) : (facultatif)",
  "inputtags":"Entrer pour valider",
  "informations":"Informations :",
  "dureequestions":"Durée question : (hh:mm:ss)",
  "questionx":"Question 1",
  "questionx0":"Question",
  "questionindicelabel":"Question : *([I]indice[/I])",
  "indicebutton":"[Indice]",
  "question1textarea":"Ajoutez votre question ici, 1000 caractères autorisés.",
  "imagedelaquestionlabel":"Image de la question :",
  "success":"Enregistré",
  "finalstep":"Etape finale:",
  "messageduree1":"La durée des questions ",
  "messageduree2":" est trop longue par rapport à la durée initiale ",
  "messageduree3":".",
  "messageordrecroissant":"Les questions s'ajoutent par ordre croissant.",
  "messageordredecroissant":"Les questions ne peuvent être supprimées que par ordre décroissant.",
  "messagequestionparse1":"La question ",
  "messagequestionparse2":" doît contenir :<br>[Q]Une question[/Q]<br>[I]éventuellement un indice[/i]<br>[RF]Une ou plusieurs réponse(s) fausse(s), [/RF]<br>[RJ]Une ou plusieurs réponse(s) juste(s).[/RJ]<br>",
  "totalcorrect":"Total Correct:",
  "vosreponses":"Vos réponses",
  "resultat":"Résultats",
  "reponsesjustes":"Réponses justes",
  "echec":"Échec",
  "succes":"Succès",
   "titreenregistrezvous":"Enregistrez vous",
  "account":"Créez un compte",
  "quizzysubtitle":"Pour utiliser les quiz",
  "personal":"Informations",
  "Status":"Status",
  "confirm":"Finalisation",
  "compteutilisateur":"Compte utilisateur",
  "steps1sur4":"Étape 1 / 4",
  "steps2sur4":"Étape 2 / 4",
  "steps3sur4":"Étape 3 / 4",
  "steps4sur4":"Étape 4 / 4",
  "email":"Email : *",
  "emailplaceholder":"Adresse de courriel...",
  "nomdutilisateur":"Nom d'utilisateur : *",
  "nomdutilisateurplaceholder":"Nom d'utilisateur",
  "motdepasse":"Mot de passe : *",
  "motdepasseplaceholder":"Mot de passe",
  "confirmezvotremotdepasse":"Confirmez votre mot de passe : *",
  "confirmezvotremotdepasseplaceholder":"Confirmez votre mot de passe",
  "titreinformations":"Informations :",
  "prenomfield":"Prénom : *",
  "prenomplaceholder":"Saisissez votre prénom",
  "nomfield":"Nom : *",
  "nomfieldplaceholder":"Saisissez votre nom de famille",
  "numerodetelfield":"Numéro de téléphone : *",
  "numerodetelfieldplaceholder":"Saississez votre numéro de téléphone",
  "statusutilisateurtitre":"Status utilisateur :",
  "utilisateurcreateur":"Utilisateur / Créateur  de Quiz",
  "etapefinale":"Etape finale:",
  "successenregistrementutilisateur":"Utilisateur enregistré avec succès",
  "nomdutilisateurincorrect":"Nom d'utilisateur incorrect",
  "motdepasseincorrect":"Mot de passe incorrect",
  "motdepassenonidentique":"Mot de passe non identique",
  "adresseemailincorrecte":"Adresse e-mail incorrecte",
  "prenomincorrect":"Prénom incorrect, vous devez le saisir",
  "nomincorrect":"Nom incorrect, vous devez le saisir",
  "numdetelchiffre":"Le numéro de téléphone doit contenir uniquement des chiffres",
  "seulslettresnombresacceptes":"Seules les lettres, nombres et _ sont acceptés.",
  "titrerequis":"Titre requis",
  "descriptionrequise":"Description requise",
  "dureesuperieurzero":"La dur&eacute;e doit &ecirc;tre supérieure à 0",
  "categorierequise":"Cat&eacute;gorie requise",
  "cliquezicirechargerpage":"Cliquez ici pour recharger la page",
   "selectionnezfichier":"Sélectionnez un fichier à mettre en ligne",
 "erreur":"Erreur :",
  "urlinvalide":"Veuillez saisir une URL valide.",
  "uniquementdesnombres":"Uniquement des nombres",
  "telvalide":"Veuillez saisir un numéro de téléphone valide.",
  "creditcardinvalide":"Numéro de carte de crédit invalide",
  "motdepassepasidentiques":"Mot de passe pas identique",
  "pasplusdecaracteres0":"Ne pas saisir plus de ",
  "pasplusdecaracteres1":"caractères.",
  "aumoinsxcaracteres":" caractères minimum.",
  "betweenxandxchars0":"Entre ",
  "betweenxandxchars1":" et ",
  "betweenxandxchars2":" caractères requis.",
  "valeurentre0":"Une valeur entre ",
  "valeurentre1":" et ",
  "valeurentre2":" est requise.",
  "inferieurouegal":"Valeur requise inférieur ou égale à ",
  "superieurouegal":"Valeur requise supérieur ou égale à ",
    "bienvenue":"Bienvenue ",
    "suiviquiz":"Vous avez suivi le quiz : ",
    "asuivivotrequiz":" a suivi votre quiz",
	"vousvousetesinscrit":"Inscription",
	"likevotrequiz":" aime votre quiz",
	"avezlikelequiz":"Vous avez aimé le quiz ",
	"finilikelequiz":"Vous n'aimez plus le quiz ",
	"userfinilikelequiz":" n'aime plus votre quiz ",
	"vousavezcreerunquiz":"Vous avez créé le quiz ",
	"useracreeunquiz":" a créé un quiz",
	"areussilequiz":"Vous avez réussi le quiz ",
	"userareussilequiz":" a passé votre quiz ",
	"abonnequiz":" est abonné",
	"abonnequiz":" s'est est abonné",
	"signalezquiz":"Vous avez signalé le quiz ",
	"signalementcertif":"Vous avez signalé le certificat",
	"signalementquiz":"Votre quiz ",
	"signalementquiz2":" a été signalé",
	"creecertifmessage":"Vous avez créé le certificat", 
	"creecertif":"Vous avez créé un certificat pour le(s) quiz ",
	"quizpassed":"Bravo ",
	"quizpassed1":" vous avez gagné un certificat ",
	"quizpassed2":"pour le(s) quiz ",
	"quizechec":"Vos points ",
	"quizechec1":" ne vous permettent pas d'obtenir le certificat ",
	"quizechecerror":"Résultats minimum attendus :",
	"deconnecte":"Vous vous êtes déconnecté",
	"connecte":"Vous vous êtes connecté",
	"messagepartage":"Vous avez partagé ",
	"messagepartagecertif":"Vous avez partagé votre certificat ",
	"deconnexion":"Déconnexion",
	"login":"Connexion",
	"aide":"Aide",
	"credits":"Remerciements :",
	"renvoipassword":"Renvoyez votre mot de passe",
	"supprimercompte":"Supprimer mon compte",
	"profiluser":"Profil utilisateur",
	"mesquiz":"Mes quiz",
	"lesquiz":"Les quiz",
	"meslike":"Quiz préférrés",
	"mescertif":"Mes certificats",
	"lescertif":"Les certificats",
	"certifreussis":"Mes certificats passés",
	"certifechec":"Certificats échoués",
	"search":"Rechercher",
	"pardate":"Par date",
	"resultrecherche":"résultat(s)",
	"recent":"récent",
	"trouve":"trouvé",
	"recents":"Récent(s)",
	"trouves":"trouvé(s)",
	"aucunresultats":"Aucun résultat trouvé",
	"cleapi":"Clé API",
	"clesecrete":"Clé secrète",
	"notifications":"Notifications",
	"chargement":"Chargement",
	"journaldeconnexion":"Journal de(s) connexion(s)",
	"bestquiz":"Meilleurs quiz",
	"stats":"Statistiques",
	"mystats":"Mes statistiques",
	"lesmieuxnote":"Les mieux notés",
	"limite":"Limite",
	"parpages":"par page(s)",
	"tri":"tri",
	"modif":"Modifier",
	"edit":"Éditer",
	"supprimer":"Supprimer",
	"ajouter":"Ajouter",
	"affichage":"Affichage",
	"pleinecran":"Plein écran",
	"zoom":"Zoom",
	"partager":"Partager",
	"partagersur":"Partager sur ",
	"exporter":"Exporter",
	"import":"Importer",
	"sync":"Synchroniser",
	"syncro":"Synchronisation",
	"syncsuccess":"Synchronisation effectuée avec succès",
	"importsuccess":"Importation effectuée avec succès",
	"syncsuccess":"Importation effectuée avec succès",
	"quizlesmieuxnotes":"Quiz les mieux notés",
	"quizmoinbiennotes":"Quiz les moins bien notés",
	"quizlesplusdifficile":"Quiz les plus difficiles",
	"quizlesplusfacile":"Quiz les plus faciles",
	"categorieplusfrequentee":"Categories les plus fréquentées",
	"tagsplusutilises":"tags les plus utilisés",
	"classement":"classement",
	"classements":"classements",
	"rechargerlapage":"Recharger la page",
	"reessayer":"Réessayer",
	"retake":"Réessayez",
},
'mots_MA' : {
  "creerlequiz":"إنشاء اﻹختبار ",
  "creerunquiz":"إنشاء اﻹختبار ",
  "ajouterquestion":"إضافة اﻷسئلة",
  "testerquiz":"إختبار اﻹختبار",
  "enregistrement":"التسجيل",
  "inputintitule":"عنوان اﻹختبار",
  "textareadescription":"صف الاختبار في بضع كلمات ، 500 حرف مسموح به ...",
  "boutonsuivant":"التالي",
  "boutonprecedent":"السابق",
  "h2creerlequiz":"إنشاء اﻹختبار",
  "steps1on4":"الخطوة  1 / 4",
  "steps2on4":"الخطوة  2 / 4",
  "steps3on4":"الخطوة  3 / 4",
  "steps4on4":"الخطوة  4 / 4",
  "labelimagedepresentation":"صورة العرض : *",
  "selectionimagepresentation":"حدد صورة لتحميلها (PNG, JPG)",
  "nofileselectedimagedepresentation":"لم يتم تحديد ملف في الوقت الحالي.",
  "intitulelabel":"التصنيف : *",
  "descriptionlabel":"الوصف: *",
  "duree":"المدة: (0 = ∞)",
  "youtubeurl":"URL Youtube: (إختياري )",
  "labelcategory":"الفئة : *",
  "inputcategory":"أدخل الفئة ",
  "tagslabel":"tag(s) : (إختياري )",
  "inputtags":"Entrer arabic",
  "informations":"معلومات :",
  "dureequestions":"مدة السؤال : (hh:mm:ss)",
  "questionindicelabel":"سؤال: *([I]رمز[/I])",
  "questionx":"سؤال 1",
  "questionx0":"سؤال",
  "indicebutton":"[رمز]",
  "question1textarea":"أضف سؤالك هنا,مسموح ب١٠٠٠ حرف.",
  "imagedelaquestionlabel":"صورة السؤال :",
  "success":"تسجيل",
  "finalstep":"الخطوة النهائية:",
  "messageduree1":"مدة الأسئلة ",
  "messageduree2":"طويل جدا مقارنة بالمدة اﻷولية ",
  "messageduree3":".",
  "messageordrecroissant":"تتم إضافة اﻷسئلة بترتيب تصاعدي.",
  "messageordredecroissant":"يمكن حدف اﻷسئلة بترتيب تنازلي فقط.",
  "messagequestionparse1":"السؤال ",
  "messagequestionparse2":"يجب أن يحتوي على: <br>[Q] سؤال [/Q]<br>[I] ربما فهرس [/i]<br>[RF] إجابة خاطئة واحدة أو أكثر ، [/RF]<br>[RJ] إجابة صحيحة أو أكثر [/RJ]",
  "totalcorrect":"المجموع الصحيح:",
  "vosreponses":"إجاباتك",
  "resultat":"النتائج",
  "reponsesjustes":"اﻹجابات الصحيحة",
  "echec":"فشل",
  "succes":"نجاح",
 "titreenregistrezvous":"تسجيل",
"account":"إنشاء حساب",
"quizzysubtitle":"لإستخدام الإختبارات",
"personal":"معلومات",
"Status":"الحالة",
"confirm":"الإنتهاء",
"compteutilisateur":"حساب المستخدم",
"steps1sur4":"الخطوة 1 / 4",
"steps2sur4":"الخطوة 2 / 4",
"steps3sur4":"الخطوة 3 / 4",
"steps4sur4":"الخطوة 4 / 4",
"email":"البريد الإلكتروني: *",
"emailplaceholder":"...عنوان البريد الإلكتروني",
"nomdutilisateur":"*:إسم المستخدم",
"nomdutilisateurplaceholder":"إسم المستخدم",
"motdepasse":"كلمة المرور: *",
"motdepasseplaceholder":"كلمة المرور",
"confirmezvotremotdepasse":"تأكيد كلمة المرور الخاصة بك: *",
"confirmezvotremotdepasseplaceholder":"تأكيد كلمة المرور الخاصة بك",
"titreinformations":"المعلومات:",
"prenomfield":"الإسم: *",
"prenomplaceholder":" أدخل إسمك",
"nomfield":"الإسم: *",
"nomfieldplaceholder":"أدخل إسمك العائلي",
"numerodetelfield":"رقم الهاتف: *",
"numerodetelfieldplaceholder":"أدخل رقم هاتفك",
"statusutilisateurtitre":"حالة المستخدم:",
"utilisateurcreateur":"المستخدم / منشئ الإختبار",
"etapefinale":"الخطوة النهائية:",
"successenregistrementutilisateur":"تم تسجيل المستخدم بنجاح",
"nomdutilisateurincorrect":"إسم المستخدم غير صحيح",
"motdepasseincorrect":"كلمة المرور غير صحيحة",
"motdepassenonidentique":"كلمة المرور غير متطابقة",
"adresseemailincorrecte":"عنوان البريد الإلكتروني غير صحيح",
"prenomincorrect":"الإسم الأول غير صحيح, يجب إدخاله",
"nomincorrect":"إسم غير صحيح, يجب إدخاله",
"numdetelchiffre":"يجب أن يحتوي رقم الهاتف على أرقام فقط",
"seulslettresnombresacceptes":"يتم قبول الأحرف, الأرقام و_ فقط.",
"titrerequis":"العنوان مطلوب",
"descriptionrequise":"الوصف مطلوب",
"dureesuperieurzero":" يجب أن تكون المدة أكبر من 0",
"categorierequise":"الفئة المطلوبة",
"cliquezicirechargerpage":"أنقر هنا لإعادة تحميل الصفحة",
 "selectionnezfichier":"حدد ملفا لتحميله",
 "erreur":"خطأ :",
"urlinvalide":"الرجاء إدخال عنوان  صالح url.",
"uniquementdesnombres":"أرقام فقط",
"telvalide":".المرجو إدخال رقم هاتف صالح",
"creditcardinvalide":"رقم بطاقة الإئتمان غير صالح",
"motdepassepasidentiques":"كلمة المرور غير متطابقة",
"pasplusdecaracteres0":"لا تدخل أكتر من ",
"pasplusdecaracteres1":".الأحرف",
"aumoinsxcaracteres":".الحد الأدنى من الأحرف",
"betweenxandxchars0":"بين ",
"betweenxandxchars1":" و ",
"betweenxandxchars2":" .الأحرف المطلوبة",
"valeurentre0":"قيمة بين ",
"valeurentre1":" و",
"valeurentre2":" .القيمة بين",
"inferieurouegal":"القيمة المطلوبة أقل من أو تساوي",
"superieurouegal":"القيمة المطلوبة أكبر من أو  تساوي ",            
"bienvenue":"أهلا ",
"suiviquiz":":لقد تابعت الإختبار ",
"asuivivotrequiz":" إتبع إختبارك,//يتبعه",
"vousvousetesinscrit":"تسجيل",
"likevotrequiz":" الإعجابات بالإختبار الخاص بك",
"avezlikelequiz":"لقد أحببت الإختبار",
"finilikelequiz":"لم تعد تحب الإختبار",
"userfinilikelequiz":" لم يعد يعجبك إختبارك",
"vousavezcreerunquiz":"لقد أنشأت الإختبار ",
"useracreeunquiz":" أنشأ إختبارا",
"areussilequiz":"لقد إجتزت الإختبار",
"userareussilequiz":" إجتاز الإختبار",
"abonnequiz":" مشترك",
"abonnequiz":" تم الإشتراك",
"signalezquiz":"لقد أشرت إلى الإختبار",
"signalementcertif":"لقد أبلغت عن الشهادة",
"signalementquiz":"إختبارك ",
"signalementquiz2":" تم الإبلاغ عنه",
"creecertifmessage":"لقد أنشأت الشهادة",
"creecertif":"لقد أنشأت شهادة للإختبار ",
"quizpassed":" جيد",
"quizpassed1":" لقد فزت بشهادة",
"quizpassed2":"من أجل المسابقة ",
"quizechec":"نقاطك",
"quizechec1":" لا تسمح لك بالحصول على الشهادة",
"quizechecerror":"الحد الأدنى من النتائج المتوقعة :",
"deconnecte":"لقد تم قطع الإتصال",
"connecte":"أنت متصل",
"messagepartage":"لقد قمت بمشاركة",
"messagepartagecertif":"لقد قمت بمشاركة شهادتك",
"deconnexion":"فصل",
"login":"إتصال",
"aide":"مساعدة",
"credits":"شكر وتقدير :",
"renvoipassword":"إعادة إرسال كلمة المرور",
"supprimercompte":"حرف حسابي",
"profiluser":"ملف المستخدم",
"mesquiz":"إختباراتي",
"lesquiz":"الإختبارات",
"meslike":"الإختبارات المفضلة",
"mescertif":"شهاداتي",
"lescertif":"الشهادات",
"certifreussis":"شهاداتي السابقة",
"certifechec":"الشهادات الفاشلة",
"search":"بحث",
"pardate":"حسب التاريخ",
"result recherche":"(نتيجة (نتائج",
"recent":"الأخيرة",
"trouve":"وجدت",
"recents":"نتيجة(s)",
"trouves":"وجدت(s)",
"aucunresultats":"لا توجد نتائج",
"cleapi":"مفتاح API",
"clesecrete":"مفتاح سري",
"notifications":"الإخطارات",
"chargement":"تحميل",
"journaldeconnexion":"سجلات الإتصال",
"bestquiz":"أفضل إختبار",
"stats":"إحصائيات",
"mystats":"إحصائياتي",
"lesmieuxnote":"الأعلى تقييما",
"limite":"حد",
"parpages":"(لكل صفحة (صفحات",
"tri":"فرز",
"modify":"تعديل",
"edit":"تحرير",
"supprimer":"حدف",
"ajouter":"مضاف",
"affichage":"عرض",
"pleinecran":"ملء الشاشة",
"zoom":"تكبير",
"partager":"شارك",
"partagersur":"مشاركة على ",
"exporter":"تصدير",
"import":"إستيراد",
"sync":"مزامنة",
"syncro":"التزامن",
"syncsuccess":"إكتملت المزامنة بنجاح",
"importsuccess":"إستيراد ناجح",
"syncsuccess":"الإستيراد تم بنجاح",
"quizlesmieuxnotes":"الإختبارات الأعلى تقييما",
"quizmoinbiennotes":"الإختبارات الأقل تقييما",
"quizlesplusdifficile":"الإختبارات الأصعب",
"quizlesplusfacile":"الإختبارات الءسهل",
"categorieplusfrequentee":"الفئات الأكتر ترددا",
"tagsplusutilises":"العلامات الأكتر إستخداما",
"classement":"التصنيف",
"classements":"الترتيب",
"rechargerlapage":"إعادة تحميل الصفحه",
"reessayer":"حاول مرة اخرى",
"retake":"حاول مرة أخرى",
 
 
}

};
		
        return langageObject[avar][a2var]
    }
};

 
