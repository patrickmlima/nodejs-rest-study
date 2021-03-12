const dbConnection = require('../db/connection');
const uploadFile = require('../files/uploadFile');

class Pet {
    create(pet, res) {
        const query = 'INSERT INTO pets SET ?';

        uploadFile(pet.imagem, pet.nome, (err, filepath) => {
            if (err) {
                return res.status(400).json(err);
            }
            
            const petUpdated = { nome: pet.nome, imagem: filepath };
            dbConnection.query(query, petUpdated, (err, result) => {
                if (err) {
                    res.status(400).json(err);
                }
                res.status(200).json(petUpdated)
            });
        });
    }
}

module.exports = new Pet;