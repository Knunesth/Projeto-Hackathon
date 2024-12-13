const openModal = document.getElementById('cad-btn')
const modalConteudo = document.getElementById('modal')
const fecharModal = document.getElementById('closeModal')
const fecharModal_2 = document.getElementById('btn-mobile')

openModal.onclick = function (){
    modalConteudo.showModal()
}
fecharModal.onclick = function(){
    modalConteudo.close()
}
fecharModal_2.onclick = function(){
    modalConteudo.close()
}
