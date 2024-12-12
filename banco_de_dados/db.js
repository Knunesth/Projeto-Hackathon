const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_scn'
});

db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = db;