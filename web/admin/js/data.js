let users = [];

function getUsers() {
    return users;
}

function addUser(userData) {
    const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        status: 'active',
        createdAt: new Date()
    };
    users.push(newUser);
    return newUser;
}

function updateUser(userId, userData) {
    users = users.map(user => 
        user.id === userId ? { ...user, ...userData } : user
    );
}

function getUserById(userId) {
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
    .then(response => response.json()).then((resultado) => {
        return resultado;
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar selecionar o usuário.');
    });
}

function deleteUser(userId) {
    fetch('/GerenciarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            acao: '4',
            id: userId
        })
    })
    .then(response => {
        if (!response.ok) {
            alert('Erro ao deletar usuário.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar deletar o usuário.');
    });
}

function toggleUserStatus(userId) {
    users = users.map(user =>
        user.id === userId
            ? { ...user, status: user.status === 'active' ? 'banned' : 'active' }
            : user
    );
}