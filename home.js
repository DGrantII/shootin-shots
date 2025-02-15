function show(menu) {
    const elem = document.getElementById(menu);
    elem.classList.toggle('shown');
}

function gallery() {
    const images = Array.from(document.querySelectorAll('div.column > img'));
    images.sort((a, b) => a.getAttribute('data-order') - b.getAttribute('data-order'));
    let index = 0;

    function visible() {
        if (index < images.length) {
            images[index].classList.add('visible');
            index++;
            setTimeout(visible, 150);
        }
    }
    visible();
}
