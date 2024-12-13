const db = require('./db.js');
const util = require('./utilities.js');

const criar = (campos) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO post (data, titulo, texto, imagem, `like`, dislike, usuario_id) VALUES (?,?,?,?,?,?,?)';

        let titulo = "";
        let hoje = new Date();
        let dia = hoje.getDate() + "";
        let mes = (hoje.getMonth() + 1) + "";
        let ano = hoje.getFullYear() + "";
        let data = `${ano}-${mes}-${dia}`;

        const lista = [
            data,
            titulo,
            util.limpar_dados(campos.texto || null),
            campos.imagem,
            0,
            0,
            Number.parseInt(campos.id || null)
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

// const alterar = (campos) => {
//     return new Promise((resolve, reject) => {
//         const query = 'UPDATE usuario SET data = ?, imagem = ?, like = ?, deslike = ? WHERE id = ?';

//         let hoje = new Date();
//         let dia = hoje.getDate() + "";
//         let mes = (hoje.getMonth() + 1) + "";
//         let ano = hoje.getFullYear() + "";
//         let data = `${ano}-${mes}-${dia}`;

//         const lista = [
//             data,
//             util.limpar_dados(campos.senha || null),
//             util.limpar_dados(campos.nome || null),
//             util.limpar_dados(numero || null),
//             util.limpar_dados(campos.cargo || null),
//             util.limpar_dados(campos.id || null)
//         ];

//         db.execute(query, lista, (err, results) => {
//             if (err) {
//                 if (err.code === 'ER_DUP_ENTRY') {
//                     const erro = err.sqlMessage.split("'")[3];
//                     reject(`Erro de duplicidade no campo: ${erro.split('_')[0]}`);
//                 } else {
//                     reject(err);
//                 }
//             } else {
//                 resolve(results);
//             }
//         });
//     });
// };

const listar = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM post';

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
        const query = 'DELETE FROM post WHERE id = ?';

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
        const query = 'SELECT * FROM post WHERE id = ?';

        db.execute(query, [campos.id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


module.exports = {
    criar,
    listar,
    deletar,
    listarPorId
};
