var fs = require('fs');
var http = require('http');
var https = require('https');
var express = require('./config/express');

var app = express();

// Ajoutez vos propres certificats letsencrypt  et dé-commentez 
// remplacer website.tld par le site web
//const privateKey = fs.readFileSync('/etc/letsencrypt/live/website.tld/privkey.pem', 'utf8');
//const certificate = fs.readFileSync('/etc/letsencrypt/live/website.tld/cert.pem', 'utf8');
//const ca = fs.readFileSync('/etc/letsencrypt/live/website.tld/chain.pem', 'utf8');

//const credentials = {
//	key: privateKey,
//	cert: certificate,
//	ca: ca
//};

// démarrage des serveur HTTP et HTTPS
const httpServer = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
	console.log('Serveur http démarré port 80');
});

//httpsServer.listen(443, () => {
//	console.log('Serveur https démarré port 443');
//});
module.exports = app;
