"use strict";
var express = require("express");
var app = express();
var PORT = 3000;
app.use(express.static(__dirname));

const mensagensMock = [
    {nome: "Victor", mensagem: "Oi me chamo Victor"},
    {nome: "Bruna", mensagem: "Oi me chamo Bruna"},
]


app.get(`/mensagens`, (req, res) => {
    res.send(mensagensMock)
});

var server = app.listen(PORT, function () {
    console.log("Funcionando na porta " + server.address().port + ".");
});
//# sourceMappingURL=server.js.map