const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;


app.use("/", express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(__dirname + "/dist/index.html");
});

app.get('/contact', function(req, res){
    res.sendFile(__dirname + "/dist/views/appointment.html");
});

app.get('/portfolio', function(req, res){
    res.sendFile(__dirname + "/dist/views/portfolio.html");
});

app.get('/info', function(req, res){
    res.sendFile(__dirname + "/dist/views/info.html");
});

app.get('/lash-extension', function(req, res){
    res.sendFile(__dirname + "/dist/views/lash-extension.html");
});

app.get('/lash-botox', function(req, res){
    res.sendFile(__dirname + "/dist/views/lash-botox.html");
});

app.get('/brows', function(req, res){
    res.sendFile(__dirname + "/dist/views/brows.html");
});

app.get('/thank-you', function(req, res){
    res.sendFile(__dirname + "/dist/views/thank-you.html");
});

app.listen(port);
