const moment = require('moment');

const dbConnection = require('../db/connection');

class Atendimento {
    adiciona(atendimento, res) {
        const created = moment().format('YYYY-MM-DD HH:mm:SS');
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS');

        const isValidDate = moment(data).isSameOrAfter(created);
        const isClientValid = atendimento.cliente.length >= 5;

        const validation = [
            {
                field: 'data',
                isValid: isValidDate,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                field: 'cliente',
                isValid: isClientValid,
                message: 'Nome do cliente deve ter pelo menos 5 caracteres'
            }
        ]

        const errors = validation.filter(v => !v.isValid);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        
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