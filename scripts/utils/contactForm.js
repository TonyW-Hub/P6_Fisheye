function displayModal(name) {
    const modal = document.getElementById('contact_modal');
    const title = document.querySelector('.title-contact')
    title.innerHTML = 'Contactez-moi'
    title.innerHTML += `<br> ${name}`
    modal.style.display = 'block';
    const main = document.querySelector('#main');
    main.style.opacity = 0.2;
    main.style.pointerEvents = 'none';
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    const main = document.querySelector('#main');
    main.style.opacity = 1;
    main.style.pointerEvents = 'auto';
}
