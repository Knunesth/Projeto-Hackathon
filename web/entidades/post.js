function verificaDados(event) {
    const id = document.getElementById('id-user').value;
    if (id == '') {
        alert('É necessário estar logado para comentar.')
        event.preventDefault();
    }
    return;
}

fetch('/GerenciarPost', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        acao: '3'
    })
}).then(response => response.json()).then(data => {
    document.getElementsByClassName('comment-model')[0].innerHTML = ``;
    if (data) {
        let comentarios = ``;
        for (let i = data.length - 1; i >= 0; i--) {
            let imagem = '';

            if (data[i].imagem != null) {
                imagem = `
                    <div>
                        <img src="${data[i].imagem}" alt="Imagem do Post" style="width: 100%; max-width: 100%">
                    </div>`;
            }
            
            comentarios += `
                <div class="tudao">
                    <div class="pessoa">
                        <div class="comment-user">
                        <i id="comment-img" class='bx bx-user' style='color:#004aad' ></i>
                        </div>
                        <div class="comment-content">
                        <div class="autor">
                            <h3>${data[i].usuario_id.nome}</h3>
                        </div>
                        </div>
                    </div>
                    <div class="comment-write">
                    <div class="comment">
                        <span dir="auto" role="text">${data[i].texto}.</span>
                    </div>
                    ${imagem}
                    </div>
                    

                    <div class="divzona">   
                    <div class="responder">
                        <button id="btn-responde">
                        <span role="text">Responder</span>
                        </button>
                    </div>
                    <div class="expandir" aria-expanded="false">
                        <button id="btn-expandir">
                        <span role="text">Ver Respostas</span>
                        </button>
                    </div>
                    </div> 
                </div>`;
        };
        document.getElementsByClassName('comment-model')[0].innerHTML = comentarios;
    }
});