const db = require('./db.js');
const util = require('./utilities.js');

const cadastrar = (campos) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO usuario (email, senha, nome, numero, cargo) VALUES (?,?,?,?,?)';
        const lista = [
            util.limpar_dados(campos.email || null),
            util.limpar_dados(campos.senha || null),
            util.limpar_dados(campos.nome || null),
            util.limpar_dados(campos.numero || null),
            util.limpar_dados(campos.cargo || null)
        ];

        db.execute(query, lista, (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    const erro = err.sqlMessage.split("'")[3];
                    reject(`Erro de duplicidade no campo: ${erro.split('_')[0]}`);
                } else {
                    reject(err);
                }
            } else {
                resolve(results);
            }
        });
    });
};

const alterar = (campos) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE usuario SET email = ?, senha = ?, nome = ?, numero = ?, cargo = ? WHERE id = ?';
        const lista = [
            util.limpar_dados(campos.email || null),
            util.limpar_dados(campos.senha || null),
            util.limpar_dados(campos.nome || null),
            util.limpar_dados(campos.numero || null),
            util.limpar_dados(campos.cargo || null),
            util.limpar_dados(campos.id || null)
        ];

        db.execute(query, lista, (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    const erro = err.sqlMessage.split("'")[3];
                    reject(`Erro de duplicidade no campo: ${erro.split('_')[0]}`);
                } else {
                    reject(err);
                }
            } else {
                resolve(results);
            }
        });
    });
};

const listar = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuario';

        db.query(query, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const deletar = (campos) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM usuario WHERE id = ?';

        db.execute(query, [campos.id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const listarPorId = (campos) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM usuario WHERE id = ?';

        db.execute(query, [campos.id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const efetuarLogin = (email, senha) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM usuario WHERE email = ? AND senha = ? LIMIT 1";

        db.execute(query, [email, senha], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

module.exports = {
    cadastrar,
    alterar,
    listar,
    deletar,
    listarPorId,
    efetuarLogin
};
