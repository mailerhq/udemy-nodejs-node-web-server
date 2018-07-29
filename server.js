const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now} ${req.method} ${req.url}`

	fs.appendFile('server.log', log + "\n", (e) => {
		if (e) {
			console.log('unable to log ro server.log');
		} 
	});
	console.log(log);
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase(text);
});

app.get('/', (req, res) => {
	// res.send('<h1>hello express!</h1>');
	res.render('home.hbs', {
		pageTitle: 'About page',
		welcomeMessage: 'Hi'
	});
});

app.get('/about', (req, res) => {
	// res.send('about page');
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "error handling request"
	});
});

app.listen(port, () => {
	console.log(`Serving on port ${port}`);
});