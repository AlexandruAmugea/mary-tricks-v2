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

app.listen(port);
