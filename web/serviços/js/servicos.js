const closeModal = document.getElementById('closeModal')
const closeModal2 = document.getElementById('closeModal2')
const modal = document.getElementById('modal')
const modal2 = document.getElementById('modal2')
const openModal = document.getElementById('btn-modal')
const openModal2 = document.getElementById('btn-modal2')

openModal.onclick = function(){
  modal.showModal()
}

closeModal.onclick = function() {
  modal.close()
}

closeModal2.onclick = function(){
  modal2.close()
}

openModal2.onclick = function(){
  modal2.showModal()
}

/*=============== SWIPER JS ===============*/
let swiperCards = new Swiper(".card__content", {
  loop: true,
  spaceBetween: 10,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },

  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    968: {
      slidesPerView: 3,
    },
  },
});


