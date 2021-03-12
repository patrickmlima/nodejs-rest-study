class Tables {
    init(conn) {
        this.conn = conn;
        this.createAttendances();
        this.createPets();
    }

    createAttendances() {
        const sql = `CREATE TABLE IF NOT EXISTS atendimentos (
            id int NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(50) NOT NULL,
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            data DATETIME NOT NULL,
            data_criacao DATETIME NOT NULL,
            status VARCHAR(20) NOT NULL,
            observacoes TEXT,
            PRIMARY KEY (id))`;
        
        this.conn.query(sql, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Table atendimentos created successfully');
            }
        });
    }

    createPets() {
        const sql = `CREATE TABLE IF NOT EXISTS pets (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(50),
            imagem VARCHAR(200),
            PRIMARY KEY (id)
        )`;

        this.conn.query(sql, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Table pets created successfully');
            }
        })
    }
}

module.exports = new Tables;