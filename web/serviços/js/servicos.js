const closeModal = document.getElementById('closeModal')
const modal = document.getElementById('modal')
const openModal = document.getElementById('btn-modal')

openModal.onclick = function(){
  modal.showModal()
}

closeModal.onclick = function() {
  modal.close()
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


