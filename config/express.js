var express = require('express');

module.exports = function() {
    var app = express();
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
	app.use(express.urlencoded({extended: true}));
    app.use(express.json({limit: '100mb'}));
	//app.use(express.urlencoded({limit: '100mb'}));
    app.use(function (req, res, next) {
	// switch to localhost
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    
    // generate the report for csp
    //res.setHeader('Content-Security-Policy-Report-Only',"default-src 'self' script-src 'report-sample' 'self' style-src 'report-sample' 'self' object-src 'none' base-uri 'self' connect-src 'self' font-src 'self' frame-src 'self' img-src 'self' manifest-src 'self' media-src 'self'");
	//res.setHeader('Content-Security-Policy',"default-src 'self' script-src 'report-sample' 'self' style-src 'report-sample' 'self' object-src 'none'base-uri 'self' connect-src 'self' font-src 'self' frame-src 'self' img-src 'self' manifest-src 'self' media-src 'self'");
	res.setHeader('Cache-control', 'public, max-age=345600');
    res.setHeader('Expires', new Date(Date.now() + 2592000000*30).toUTCString());
    next();
	});
    require('../app/routes/index.server.routes.js')(app);
	app.use(express.static('./public'));
    return app;
};
