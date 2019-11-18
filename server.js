"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app)
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const dbUrl = require("./config/mongo.config").dbUrl;
const mensagemSchema = require("./model/mongoose.model").mensagemSchema;

var PORT = 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);


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
 * @function io.emit() cria um evento chamado mensagem com conteúdo do body. Vai ser chamado no front end
*/
app.post(`/mensagens`, (req, res) => {
    const mensagem = new mensagemSchema(req.body);
    mensagem.save(error => {
        if (error) {
            console.log(`TCL: error`, error);
            res.sendStatus(500)
        };
        mensagensMock.push(req.body);
        io.emit('mensagem', req.body);
        res.sendStatus(200);
    });
    
});

/**
 * @description Esse método informa toda vez que um novo usuário se conecta
 */
io.on('connection', socket => {
    console.log(`TCL: Um usuário se conectou.`);
});

mongoose.connect(dbUrl, error => {
    console.log(`TCL: mongo db connection.`, error)
});

var server = http.listen(PORT, function () {
    console.log("Funcionando na porta " + server.address().port + ".");
});
//# sourceMappingURL=server.js.map