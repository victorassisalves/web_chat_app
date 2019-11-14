"use strict";
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let mensagensMock = [
    {nome: "Victor", mensagem: "Oi me chamo Victor"},
    {nome: "Bruna", mensagem: "Oi me chamo Bruna"},
]


app.get(`/mensagens`, (req, res) => {
    res.send(mensagensMock)
});


/**
 * @description Posta as mensagens 
 */
app.post(`/mensagens`, (req, res) => {
    mensagensMock.push(req.body);
console.log(`TCL: req`, req.body);
    res.sendStatus(200)
});

var server = app.listen(PORT, function () {
    console.log("Funcionando na porta " + server.address().port + ".");
});
//# sourceMappingURL=server.js.map