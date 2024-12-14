class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.form = document.getElementById('user-form');
        this.modalTitle = document.getElementById('modal-title');
        this.closeBtn = document.querySelector('.modal-close');
        this.cancelBtn = document.getElementById('cancel-btn');
        
        this.currentUser = null;
        this.setupListeners();
    }

    setupListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.cancelBtn.addEventListener('click', () => this.close());
    }

    open(user = null) {
        this.currentUser = user;
        this.modalTitle.textContent = user ? 'Editar Usuário' : 'Novo Usuário';
        this.form.nomeUsuario.value = user ? user.nome : '';
        this.form.emailUsuario.value = user ? user.email : '';
        this.form.cargoUsuario.value = user ? user.cargo : 'user';
        this.form.acaoUsuario.value = user ? '2' : '1';
        this.form.numeroUsuario.value = user ? user.numero : '';;
        this.form.btnSubmit.textContent = user ? 'Alterar' : 'Cadastrar';
        this.form.idUsuario.value = user ? user.id : '';
        this.form.senhaUsuario.value = user ? user.senha : '';
        this.modal.classList.add('active');
    }

    close() {
        this.modal.classList.remove('active');
        this.form.reset();
        this.currentUser = null;
    }
}