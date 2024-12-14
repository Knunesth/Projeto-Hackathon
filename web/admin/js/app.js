let modal;

function updateUI() {
    renderUsersTable();
    updateAnalytics();
}

function setupTabNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${targetTab}-section`)?.classList.add('active');
        });
    });
}

function init() {
    modal = new Modal();
    
    document.getElementById('new-user-btn').addEventListener('click', () => {
        modal.open();
    });

    setupTabNavigation();
    updateUI();
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', init);