function renderUsersTable() {
    fetch('/GerenciarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            acao: '3'
        })
    }).then(response => response.json()).then(data => {
        users = data;
        const tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Função</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(createUserRow).join('')}
            </tbody>
        </table>
    `;
    document.querySelector('.table-container').innerHTML = tableHTML;
    lucide.createIcons();
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

function createUserRow(user) {
    let cargo = 'Usuário';
    if (user.cargo == 'admin') {
        cargo = 'Administrador';
    }
    if (user.cargo == 'empresa') {
        cargo = 'Empresa'
    }

    let status = 'active';
    if (user.status == 0) {
        status = 'banned';
    }

    return `
        <tr>
            <td>${user.nome}</td>
            <td>${user.email}</td>
            <td>
                <span class="badge badge-${user.cargo}">
                    ${cargo}
                </span>
            </td>
            <td>
                <span class="badge badge-${status}">
                    ${user.status == 1? 'Ativo' : 'Banido'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="handleEditUser(${user.id})" title="Editar">
                        <i data-lucide="edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="handleDeleteUser(${user.id})" title="Excluir">
                        <i data-lucide="trash-2"></i>
                    </button>
                    <button class="btn-icon btn-ban" onclick="handleToggleUserStatus(${user.id})" title="Banir/Desbanir">
                        <i data-lucide="ban"></i>
                    </button>
                </div>
            </td>
        </tr>
    `;
}

function handleEditUser(userId) {
    fetch('/GerenciarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            acao: '5',
            id: userId
        })
    })
    .then(response => response.json()).then((usuario) => {
        console.log(usuario);
        if (usuario) {
            modal.open(usuario[0]);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar selecionar o usuário.');
    });
}

function handleDeleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        deleteUser(userId);
        updateUI();
    }
}

function handleToggleUserStatus(userId) {
    fetch('/GerenciarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            acao: '5',
            id: userId
        })
    })
    .then(response => response.json()).then((usuario) => {
        var user = usuario[0];
        if (!user) {
            return;
        }
        var status = user.status === 1 ? 0 : 1;

        fetch('/GerenciarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                acao: '2',
                id: user.id,
                nome: user.nome,
                email: user.email,
                numero: user.numero,
                status: status,
                senha: user.senha,
                cargo: user.cargo
            })
        })
        .then(response => response.json());
        updateUI();
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar selecionar o usuário.');
    });
    updateUI();
}