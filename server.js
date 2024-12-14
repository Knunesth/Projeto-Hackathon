const express = require('express');
const path = require('path');
const session = require('express-session');
const fileupload = require('express-fileupload');

const app = express();
const port = 3000;

/*
    Configuração do servidor
*/ 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'site-scn',
    resave: false,
    saveUnitialized: true,
    cookie: {secure: false}
}));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'web', 'home.html'));
});

app.get('/sessao', (req, res) => {
    const usuario = req.session.usuario;
    if (usuario) {
        return res.json(usuario);
    } else {
        return res.json({});
    }
});

app.get('/logoff', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao destruir a sessão', err);
            return res.status(500).send('Não foi possível efetuar o logoff');
        }
        return res.status(200).redirect('/');
    });
});

app.use(express.static('web'));

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
                let id = undefined;
                await usuarioDAO.cadastrar(campos, res).then((resultado) => {
                    id = resultado.insertId;
                });
                if (id != undefined && req.session.usuario == undefined) {
                    await usuarioDAO.listarPorId({id: id}, res).then((resultado) => {
                        req.session.usuario = resultado[0];
                        req.session.save();
                    });
                }
                if (req.session.usuario && req.session.usuario.cargo === 'admin') {
                    res.redirect('admin/index.html');
                } else {
                    res.redirect('home.html');
                }
                break;

            case '2': // Alterar
                console.log(campos);
                await usuarioDAO.alterar(campos, res).then((resultado) => {
                    return res.redirect('admin/index.html');
                });
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
                history.back();
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
            if (resultado[0].status == 0) {
                throw "Usuário banido. Não é possível fazer login."
            }
            req.session.usuario = resultado[0];
            req.session.save();
            console.log(req.session.usuario);
            
            res.redirect('home.html');
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

// Gerenciamento dos posts ---------------------------------------

const postDAO = require('./postDAO.js'); 
const { uniqueId } = require('@splidejs/splide/src/js/utils');

app.post('/GerenciarPost', async (req, res) => { 
    const acao = req.body.acao;
    const campos = req.body;

    if (!acao) {
        return res.status(400).send('Está faltando um parâmetro!');
    }

    try {
        switch (acao) {
            case '1': // Criar
            
                if (req.files) {
                    const imagem = req.files.imagem;

                    imagem.name = Date.now() + imagem.name;
                
                    const uploadPath = path.join(__dirname, 'web', 'comunidade', 'img',imagem.name);
                    
                    imagem.mv(uploadPath, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        console.log(`Imagem salva com sucesso em: ${uploadPath}`);
                    });

                    campos.imagem = "img/" + imagem.name;
                } else {
                    campos.imagem = null;
                }
                await postDAO.criar(campos, res);
                res.redirect('comunidade/comunidade.html');
                break;

            case '2': // Alterar - DESATIVADO
                console.error('Funcionalidade desativada.');
                // await postDAO.alterar(campos, res);
                res.redirect('home.html');
                break;

            case '3': // Listar
                let result = undefined;
                await postDAO.listar(res).then((resultado) => {
                    result = resultado;
                });
                
                if (result != undefined) {
                    for (let i = 0; i < result.length; i++) {
                        await usuarioDAO.listarPorId({id: result[i].usuario_id}).then((resultado) => {
                            result[i].usuario_id = resultado[0];
                        });
                    }
                    return res.json(result);
                }
                res.redirect('comunidade/comunidade.html');
                break;

            case '4': // Deletar
                await postDAO.deletar(campos, res).then((resultado) => {
                    return res.json(resultado);
                });
                break;
            
            case '5': // Listar por ID
                await postDAO.listarPorId(campos, res).then((resultado) => {
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
                history.back()';
            </script>
        `);
    }
});




