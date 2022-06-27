//Mettre le code JavaScript lié à la page photographer.html
async function detailsPhotographer(data, photographer, urlId) {
    const { name } = photographer;

    const filterMedias = document.querySelector('.photograph-filter');
    filterMedias.style.display = 'block';

    const getNameForMedias = name.split(' ');
    let onlyOnePhotoraph;
    let mediasOfPhotographer = [];
    let AllLikes = [];
    let addLikeMedia = [];

    data.forEach((medias) => {
        if (medias.photographerId === parseInt(urlId)) {
            mediasOfPhotographer.push(medias);
            AllLikes.push(medias.likes);
        }
    });

    if (photographer.id === parseInt(urlId)) {
        onlyOnePhotoraph = photographer;
        if (!localStorage.getItem(`${photographer.name} Likes`)) {
            localStorage.setItem(`${photographer.name} Likes`, JSON.stringify(addLikeMedia));
        }
    }

    function getDetailsHeader(photograph) {
        if (photograph !== undefined) {
            const photographHeader = document.querySelector('.photograph-header');
            photographHeader.innerHTML += `
                    <div class="information">
                        <h2>${photograph.name}</h2>
                        <p class="place">${photograph.city}, ${photograph.country}</p>
                        <p class="tagline">${photograph.tagline}</p>
                    </div>
                    <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                    <div class="portrait">
                        <img src="${photograph.picture}" alt="">
                    </div>
                `;
        }
    }

    getDetailsHeader(onlyOnePhotoraph);

    function renderFilteredMedia(filter) {
        let media;
        // Logic of filter
        if (photographer.id === parseInt(urlId)) {
            switch (filter) {
                // filter by popular
                case 'Popularité':
                    media = data.sort((a, b) => {
                        if (b.likes < a.likes) {
                            return -1;
                        } else if (b.likes > a.likes) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    renderMediasGallery(media);
                    break;
                // filter by date
                case 'Date':
                    media = data.sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    });
                    renderMediasGallery(media);
                    break;
                // filter by title
                case 'Titre':
                    media = data.sort((a, b) => {
                        if (a.title < b.title) {
                            return -1;
                        } else if (a.title > b.title) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    renderMediasGallery(media);
                    break;
                default:
                    // filter by popular
                    media = data.sort((a, b) => {
                        if (b.likes < a.likes) {
                            return -1;
                        } else if (b.likes > a.likes) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                    if (media) {
                        renderMediasGallery(media);
                    } else {
                        return;
                    }
                    break;
            }
        }
    }

    renderFilteredMedia();

    function filterFc() {
        const mediaSelect = document.querySelector('.photograph-filter-select');
        // Check type of filter
        mediaSelect.addEventListener('change', function (e) {
            if (photographer.id === parseInt(urlId)) {
                renderFilteredMedia(mediaSelect.value);
            }
        });
    }

    filterFc();

    function renderMediasGallery(medias) {
        // Get DOM element
        const gallery = document.querySelector('.photograph-gallery');
        // Reset innerHtml for filter
        gallery.innerHTML = '';
        let mediaId = [];

        // Loop on all medias of photographer selected
        medias.forEach((media) => {
            // Get path of medias
            const getImages = `assets/images/${getNameForMedias[0]}/${media.image}`;
            const getVideo = `assets/images/${getNameForMedias[0]}/${media.video}`;
            let displayImages = '';
            let displayVideo = '';
            mediaId.push(media.id);
            // Check type of media (IMG or VIDEO)
            if (media.image !== undefined) {
                displayImages = `<img src="${getImages}" alt="${media.title}" loading="lazy" class="gallery-media-img"></img>`;
            } else if (media.video !== undefined) {
                displayVideo = `<video controls="controls"><source src="${getVideo}" type="video/mp4"></video>`;
            } else {
                console.log('Medias not found');
            }
            // Display container of one media
            gallery.innerHTML += `
                <div class="gallery-media">
                    ${displayVideo}
                    ${displayImages}
                    <div class="gallery-media-info">
                        <h4>${media.title}</h4>
                        <span class="gallery-media-likes">${
                            localStorage.getItem(media.id) ? media.likes + 1 : media.likes
                        } <i class="fa-solid fa-heart" aria-label="likes"></i></span>
                    </div>
                </div>
            `;
            if (gallery !== null) {
                // Get DOM element
                const likeContainer = document.querySelectorAll('.gallery-media-likes');
                // Loop on all medias
                for (let i = 0; i < likeContainer.length; i++) {
                    // Get likes of media
                    let likes = likeContainer[i];
                    // Get id of media
                    let id = mediaId[i];

                    // Listen click on likes medias
                    likes.addEventListener('click', () => {
                        // Get value of likes in DOM element
                        let like = parseInt(likes.textContent);
                        // Remove & Add like user
                        if (localStorage.getItem(`${id}`)) {
                            localStorage.removeItem(`${id}`);
                            like--;
                            const getItemInLocalStorage = localStorage.getItem(`${photographer.name} Likes`);
                            const parseArray = JSON.parse(getItemInLocalStorage);
                            parseArray.pop();
                            localStorage.setItem(`${photographer.name} Likes`, JSON.stringify(parseArray));
                            likes.innerHTML = like + ' ' + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                            renderStickyInformation();
                        } else {
                            localStorage.setItem(`${id}`, 'liked');
                            like++;
                            const getItemInLocalStorage = localStorage.getItem(`${photographer.name} Likes`);
                            const parseArray = JSON.parse(getItemInLocalStorage);
                            parseArray.push(1);
                            localStorage.setItem(`${photographer.name} Likes`, JSON.stringify(parseArray));
                            likes.innerHTML = like + ' ' + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                            renderStickyInformation();
                        }
                    });
                }
            }
        });
    }

    function renderStickyInformation(likes, addLike) {
        // Get DOM element for display information likes
        const sticky = document.querySelector('.photograph-sticky');
        if (photographer.id !== undefined && photographer.id === parseInt(urlId) && likes !== undefined) {
            // Get sum of all likes in JSON
            const totalLikesJson = likes.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            // Get array of user likes in localStorage
            const likesUser = JSON.parse(localStorage.getItem(`${photographer.name} Likes`));
            // Get sum of user likes
            const totalLikesUser = likesUser.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
            // Get sum of total likes
            const totalLikes = totalLikesJson + totalLikesUser;

            // Display information of photographers with total likes
            if (sticky && totalLikes !== null) {
                sticky.innerHTML += `
                    <div class="sticky-information"> 
                        <p id="totalLikes">${totalLikes} <i class="fa-solid fa-heart"></i></p>
                        <p>${photographer.price} / €</p>
                    </div>
                `;
            }
        }
    }

    renderStickyInformation(AllLikes, addLikeMedia);

    return { getDetailsHeader, renderMediasGallery };
}
