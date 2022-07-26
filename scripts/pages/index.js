async function displayData(photographers, medias, data) {
    // Get DOM element for display data
    const body = document.getElementsByTagName('body')[0];
    const logo = document.querySelector('.logo');
    const photographersSection = document.querySelector('.photographer_section');
    const photographHeader = document.querySelector('.photograph-header');
    const filterContainer = document.createElement('div');
    filterContainer.innerHTML = 'Trier par';
    filterContainer.classList.add('photograph-filter');
    const filterMedias = document.createElement('select');
    filterMedias.classList.add('photograph-filter-select');
    const popular = document.createElement('option');
    popular.innerHTML = 'Popularité';
    const date = document.createElement('option');
    date.innerHTML = 'Date';
    const title = document.createElement('option');
    title.innerHTML = 'Titre';
    const gallery = document.createElement('div');
    gallery.classList.add('photograph-gallery');
    const stickyContainer = document.createElement('div');
    stickyContainer.classList.add('photograph-sticky');
    const modalMedia = document.createElement('dialog');
    modalMedia.classList.add('modal-media');
    modalMedia.setAttribute('autofocus', 'autofocus');
    const main = document.querySelector('#main');
    filterMedias.appendChild(popular);
    filterMedias.appendChild(date);
    filterMedias.appendChild(title);
    filterContainer.appendChild(filterMedias);
    main.appendChild(filterContainer);
    main.appendChild(gallery);
    main.appendChild(stickyContainer);
    body.appendChild(modalMedia);

    // Get id  in url params
    const urlId = new URLSearchParams(window.location.search).get('id');

    logo.addEventListener('click', () => {
        window.location.href = 'index.html'
    })

    // Loop for each photographers in database
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        if (photographersSection !== null) {
            photographersSection.appendChild(userCardDOM);
        }
        const photographpherMedias = medias.filter((media) => media.photographerId === photographer.id);
        if (photographHeader !== null && filterContainer !== null) {
            const detailsPhotographerModel = detailsPhotographer(photographpherMedias, photographerModel, urlId);
        }
    });
}

async function init() {
    // Recover photographers data
    const data = await getData();
    const { photographers } = await getPhotographers();
    const { medias } = await getMedias();
    displayData(photographers, medias, data);
}

init();
