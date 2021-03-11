const Atendimento = require('../models/atendimentos');

module.exports = (app) => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.list(res);
    });

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Atendimento.getOne(id, res);
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;
        Atendimento.adiciona(atendimento, res);
    });
}
