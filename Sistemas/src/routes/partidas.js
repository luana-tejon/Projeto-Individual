var express = require("express");
var router = express.Router();

var partidasController = require("../controllers/partidasController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    partidasController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    partidasController.autenticar(req, res);
});

router.post("/puxarRanks", function (req, res) {
    partidasController.puxarRanks(req, res);
});

router.post("/inserirConquistas", function (req, res) {
    partidasController.inserirConquistas(req, res);
});

router.post("/puxarConquistas", function (req, res) {
    partidasController.puxarConquistas(req, res);
});

module.exports = router;