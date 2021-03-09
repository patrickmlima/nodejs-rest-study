const moment = require('moment');

const dbConnection = require('../db/connection');

class Atendimento {
    adiciona(atendimento, res) {
        const created = moment().format('YYYY-MM-DD HH:mm:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS');

        const isValidDate = moment(data).isSameOrAfter(created);
        const isClientValid = atendimento.cliente.length >= 5;
        
        const atendimentoDatado = { ...atendimento, data_criacao: created, data};

        const sql = 'INSERT INTO atendimentos SET ?';

        dbConnection.query(sql, atendimentoDatado, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(201).json(result);
            }
        });
    }
}

module.exports = new Atendimento;