//start program

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//EXPRESS MIDDLEWARE
app.use((req, res, next) => {
    var dateNow = new Date().toString();

    var logs = `Logged at: ${dateNow}: ${req.method}, ${req.url} \n`;

    console.log(logs);
    fs.appendFile('server.log', logs, (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });

    next();
});

// //EXPRESS MIDDLEWARE -- FOR MAINTENANCE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
// app.use(express.static(__dirname + '/public'));
// // //--EXPRESS MIDDLEWARE -- FOR MAINTENANCE--


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('upperIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageHead: 'Home',
        pageTitle: 'Home page',
        bodyMssg: 'This is paragraph'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageHead: 'Sample',
        pageTitle: 'About page',
        bodyMssg: 'This is a sample paragraph'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMssg: 'Fucker you wrong'
    });
});

app.listen(3000, () => {
    console.log('It runnin fucka');
});