'Use strict';

import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
gallery.append(createGalleryList(galleryItems));
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGalleryList(arr) {
  const galleryList = document.createElement('ul');
  galleryList.classList.add('gallery__list');

  const galleryItems = arr.map(elem => {
    const { preview, original, description } = elem;
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', original);
    galleryItem.append(galleryLink);
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.setAttribute('src', preview);
    galleryImage.setAttribute('alt', description);
    galleryLink.append(galleryImage);
    return galleryItem;
  });

  galleryList.append(...galleryItems);
  return galleryList;
}
