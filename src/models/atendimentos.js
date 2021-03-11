const moment = require('moment');

const dbConnection = require('../db/connection');

class Atendimento {
    _formatDate(atendimento) {
        if (atendimento.data) {
            return moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:SS');
        }
    }

    adiciona(atendimento, res) {
        const created = moment().format('YYYY-MM-DD HH:mm:SS');
        const data = this._formatDate(atendimento);

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

    list(res) {
        const sql = `SELECT * FROM atendimentos`;

        dbConnection.query(sql, (err, list) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(list);
        });
    }

    getOne(id, res) {
        const sql = 'SELECT * FROM atendimentos WHERE id = ?';

        dbConnection.query(sql, id, (err, atendimento) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(atendimento[0]);
        });
    }

    update(id, values, res) {
        const data = this._formatDate(values);
        if (data) {
            values = { ...values, data };
        }

        const sql = 'UPDATE atendimentos SET ? WHERE id = ?';
        dbConnection.query(sql, [values, id], (err, result) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.status(200).json(result);
        });
    }
}

module.exports = new Atendimento;