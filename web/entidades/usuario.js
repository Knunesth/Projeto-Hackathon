function listar() {
    fetch('/GerenciarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            acao: '3'
        })
    }).then(response => response.json()).then(data => {
        return data;

        // data.forEach(item => {
        //     const id = limpar_dados(item.id || null);
        //     const nome = limpar_dados(item.nome || null);
        //     const email = limpar_dados(item.email || null);

        //     tabela.innerHTML += `
        //         <tr>
        //             <td>${id}</td>
        //             <td>${nome}</td>
        //             <td>${email}</td>
        //             <td>
        //                 <button onclick="location.href = 'alterar_usuario.html?id=${id}'"> Alterar </button>
        //                 <button onclick="deletarUsuario(${id})"> Excluir </button>
        //             </td>
        //         </tr>
        //     `;
        // });
    }).catch(error => console.error('Erro ao buscar     dados:', error));
    return [];
}

function deletarUsuario(idUsuario) {
    const acao = '4'; 

    if (!confirm(`Deseja deletar o usuário de id ${idUsuario}?`)) {
        return;
    }

    fetch('/GerenciarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            acao: acao,
            id: idUsuario
        })
    })
    .then(response => {
        if (!response.ok) {
            window.location.href = 'admin/index.html';
        } else {
            alert('Erro ao deletar usuário.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar deletar o usuário.');
    });
}

fetch('/sessao').then(response => response.json()).then(usuario => {
    console.log(usuario.id);
    if (usuario.id) {
        var nome = usuario.nome + "";

        // Informações do login e logoff

        const btnLogin = document.getElementsByClassName('login-button')[0];
        const btnLogoff = document.getElementsByClassName('logoff-button')[0];
        btnLogin.setAttribute('href', '../home.html');
        btnLogin.textContent = `Olá, ${nome.split(' ')[0]}`;
        btnLogoff.setAttribute('style', 'display: block');

        if (usuario.cargo === 'admin') {
            const navBar = document.getElementsByClassName('navbar-nav')[0];
            navBar.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link mx-lg-2" aria-current="page" href="/admin/index.html">Administração</a>
                </li>
            `;
        }

        // Informações do post

        document.getElementById('user').textContent = nome;
        document.getElementById('id-user').value = usuario.id;
        return;
    }
    return;
});
