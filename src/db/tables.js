class Tables {
    init(conn) {
        this.conn = conn;
        this.createAttendances();
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
                console.log('Tables created successfully');
            }
        });
    }
}

module.exports = new Tables;