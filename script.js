import photos from './gallery-items.js';

// -------------  ИНИЦИЛИЗАЦИЯ ВСЕХ REFS ------------

const refs = {
  gallery: document.querySelector('.gallery'),
  link: document.querySelector('.gallery__link'),
  lightbox: document.querySelector('.js-lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
};

let imgIndex = '';

// ------------- СОЗДАНИЕ РАЗМЕТКИ ----------------

let galleryArr = photos.map(elem => {
  let galleryItem = `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${elem.original}"
  >
    <img
      class="gallery__image"
      src="${elem.preview}"
      data-source="${elem.original}"
      data-index="${photos.indexOf(elem)}"
      alt="${elem.description}"
    />
  </a>
</li>`;

  return galleryItem;
});
refs.gallery.insertAdjacentHTML('beforeend', galleryArr.join(''));

// ---------------------------------------

// -------------- ВЕШАЕМ СЛУШАТЕЛЯ НА СПИСОК и НА КНОПКУ ЗАКРЫТИЯ МОДАЛКИ и НА ССЫЛКУ ЧТОБЫ СНЯТЬ АВТОПЕРЕХОД ------------

refs.gallery.addEventListener('click', onPhotoClick);
refs.modalCloseBtn.addEventListener('click', onButtonClick);
refs.lightbox.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscPress);
window.addEventListener('keyup', onArrowRight);
window.addEventListener('keyup', onArrowLeft);
refs.link.addEventListener('click', onPhotoClick);

// -------------- ДОБАВЛЯЕМ КЛАСС ДЛЯ МОДАЛКИ ПРИ КЛИКЕ -----------
function onPhotoClick(event) {
  event.preventDefault();

  let clickedPhoto = event.target;

  if (clickedPhoto.nodeName !== 'IMG') return;
  refs.lightbox.classList.add('is-open');
  refs.modalImage.setAttribute('src', `${clickedPhoto.dataset.source}`);
  imgIndex = Number(clickedPhoto.dataset.index);
}

// ------------ УБИРАЕМ КЛАСС МОДАЛКИ ПРИ КЛИКЕ И ЧИСТИМ src У КАРТИНКИ -----

function onButtonClick() {
  refs.lightbox.classList.remove('is-open');
  refs.modalImage.setAttribute('src', '');
}

function onOverlayClick() {
  if (event.target.nodeName === 'IMG') return;
  onButtonClick();
}

// let indexN = galleryArr.prototype.find(photo => photo.);

function onEscPress(event) {
  if (event.key === 'Escape') {
    onButtonClick();
  }
}

function onArrowRight() {
  if (
    !refs.lightbox.classList.contains('is-open') ||
    event.key !== 'ArrowRight'
  )
    return;
  if (imgIndex === photos.length - 1) return;
  refs.modalImage.src = photos[imgIndex + 1].original;
  imgIndex += 1;
}

// function onArrowLeft() {
//   if (!refs.lightbox.classList.contains('is-open') || event.key === 'ArrowLeft')
//     return;
//   if (imgIndex === 0) return;
//   refs.modalImage.src = photos[imgIndex - 1].original;
//   imgIndex -= 1;
// }

//
//
//
//
//
//   } else if (event.key === 'ArrowRight') {
//     refs.modalImage.setAttribute('src', '${photos[6].original}');
//   } else if (event.key === 'ArrowLeft') {
// }
