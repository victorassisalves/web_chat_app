const mongoose = require("mongoose");
const mensagem = mongoose.model("chat", {
    nome: String,
    mensagem: String
});

exports.mensagemSchema = mensagem;