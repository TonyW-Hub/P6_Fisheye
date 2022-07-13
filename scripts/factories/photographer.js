function photographerFactory(data) {
    const { name, portrait, price, city, country, tagline, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Create article of photographers
        const article = document.createElement('article');
        article.innerHTML += `
            <div class="headerCard" tabindex="0">
                <img src="${picture}" alt="${name}"/>
                <h2>${name}</h2>
            </div>
            <div class="description">
                <p class="place">${data.city}, ${data.country}</p>
                <p class="tagline">${data.tagline}</p>
                <p class="price">${data.price}€/jour</p>
            </div>
        `;
        article.addEventListener('click', () => {
            window.location = `photographer.html?id=${data.id}`;
        });
        article.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                window.location = `photographer.html?id=${data.id}`;
            }
        });

        return article;
    }
    return { name, picture, getUserCardDOM, price, city, country, tagline, id };
}
