const openModal = document.getElementById('cad-btn')
const modalConteudo = document.getElementById('modal')
const fecharModal = document.getElementById('closeModal')

openModal.onclick = function (){
    modalConteudo.showModal()
}
fecharModal.onclick = function(){
    modalConteudo.close()
}
