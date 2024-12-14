function updateAnalytics() {
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
        const analytics = {
            total: users.length,
            active: users.filter(u => u.status === 1).length,
            banned: users.filter(u => u.status === 0).length,
            admins: users.filter(u => u.cargo === 'admin').length
        };
    
        const analyticsHTML = `
            <div class="analytics-card">
                <div class="analytics-card-header">
                    <i data-lucide="users" class="text-blue-600"></i>
                    <h3>Total de Usuários</h3>
                </div>
                <p class="analytics-value text-blue-900">${analytics.total}</p>
            </div>
            <div class="analytics-card">
                <div class="analytics-card-header">
                    <i data-lucide="user-check" class="text-green-600"></i>
                    <h3>Usuários Ativos</h3>
                </div>
                <p class="analytics-value text-green-600">${analytics.active}</p>
            </div>
            <div class="analytics-card">
                <div class="analytics-card-header">
                    <i data-lucide="user-x" class="text-red-600"></i>
                    <h3>Usuários Banidos</h3>
                </div>
                <p class="analytics-value text-red-600">${analytics.banned}</p>
            </div>
            <div class="analytics-card">
                <div class="analytics-card-header">
                    <i data-lucide="shield" class="text-blue-600"></i>
                    <h3>Administradores</h3>
                </div>
                <p class="analytics-value text-blue-600">${analytics.admins}</p>
            </div>
        `;
    
        document.querySelector('.analytics-grid').innerHTML = analyticsHTML;
        lucide.createIcons();
    }
)}