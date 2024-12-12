const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

/*
    Configuração do servidor
*/ 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'index.html'));
});

app.use(express.static('web'));//Arquivos pela URL 

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


/*
    Configuração dos DAO
*/

// Gerenciar Usuário ---------------------------------------------

const usuarioDAO = require('./usuarioDAO.js');

app.post('/GerenciarUsuario', async (req, res) => {
    const acao = req.body.acao;
    const campos = req.body;

    if (!acao) {
        return res.status(400).send('Está faltando um parâmetro!');
    }

    try {
        switch (acao) {
            case '1': // Cadastrar
                await usuarioDAO.cadastrar(campos, res);
                res.redirect('usuarios.html');
                break;

            case '2': // Alterar
                await usuarioDAO.alterar(campos, res);
                res.redirect('usuarios.html');
                break;

            case '3': // Listar
                await usuarioDAO.listar(res).then((resultado) => {
                    return res.json(resultado);
                });
                break;

            case '4': // Deletar
                await usuarioDAO.deletar(campos, res).then((resultado) => {
                    return res.json(resultado);
                });
                break;
            
            case '5': // Listar por ID
                await usuarioDAO.listarPorId(campos, res).then((resultado) => {
                    return res.json(resultado);
                });
                break;

            default:
                return res.status(400).send('Entidade inválida!');
        }
        
    } catch (error) {
        console.error(error);
        res.send(`
            <script>
                alert('${error}');
                window.location.href = '/usuarios.html';
            </script>
        `);
    }
});

// Processar Login ------------------------------------------------------------

app.post('/ProcessarLogin', async (req, res) => {
    const {email, senha} = req.body;

    if (!email || !senha) {
        return res.status(400).send('Está faltando um parâmetro!');
    }

    try {
        let usuario = {};
        await usuarioDAO.efetuarLogin(email, senha).then((resultado) => {
            if (resultado[0] == undefined) {
                throw "Email e/ou senha inválidos! Tente novamente."
            }
            res.redirect('usuarios.html');
            return;
        });
        
    } catch (error) {
        console.error(error);
        res.send(`
            <script>
                alert('${error}');
                history.back();
            </script>
        `);
    }
});



