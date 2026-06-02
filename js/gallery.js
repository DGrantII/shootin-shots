/**
 * Gallery page: sort images by data-order and reveal them in sequence.
 * Loaded on gallery.html only; runs when a .gallery element is present.
 */

function revealGalleryImages() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) {
        return;
    }

    const images = Array.from(document.querySelectorAll('div.column > img'));
    images.sort((a, b) => a.getAttribute('data-order') - b.getAttribute('data-order'));

    let index = 0;

    function showNext() {
        if (index < images.length) {
            images[index].classList.add('visible');
            index += 1;
            setTimeout(showNext, 150);
        }
    }

    showNext();
}

document.addEventListener('DOMContentLoaded', revealGalleryImages);
