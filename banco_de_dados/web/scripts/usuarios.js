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
        const tabela = document.getElementById('tabela-usuarios').querySelector('tbody');
        tabela.innerHTML = '';

        data.forEach(item => {
            const id = limpar_dados(item.id || null);
            const nome = limpar_dados(item.nome || null);
            const email = limpar_dados(item.email || null);

            tabela.innerHTML += `
                <tr>
                    <td>${id}</td>
                    <td>${nome}</td>
                    <td>${email}</td>
                    <td>
                        <button onclick="location.href = 'alterar_usuario.html?id=${id}'"> Alterar </button>
                        <button onclick="deletarUsuario(${id})"> Excluir </button>
                    </td>
                </tr>
            `;
        });
    }).catch(error => console.error('Erro ao buscar dados:', error));
    return;
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
        if (response.ok) {
            window.location.href = '/usuarios.html';
        } else {
            alert('Erro ao deletar usuário.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar deletar o usuário.');
    });
}