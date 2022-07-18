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
    let modalIndex = 1;

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
                    <button class="contact_button">Contactez-moi</button>
                    <div class="portrait">
                        <img src="${photograph.picture}" alt="${photograph.name}">
                    </div>
                `;
            if (photographHeader) {
                const btnCotact = document.querySelector('.contact_button');
                btnCotact.addEventListener('click', () => displayModal(photograph.name));
            }
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
        let modalMedia = [];

        // Loop on all medias of photographer selected
        medias.forEach((media, index) => {
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
                <section class="gallery-media" tabindex="1">
                    <figure>
                        ${displayVideo ? displayVideo : displayImages}                    
                    </figure>
                    <div class="gallery-media-info">
                        <h4>${media.title}</h4>
                        <span class="gallery-media-likes">${
                            localStorage.getItem(media.id) ? media.likes + 1 : media.likes
                        } <i class="fa-solid fa-heart" aria-label="likes"></i></span>
                    </div>
                </secti>
            `;
            if (gallery !== null) {
                modalMedia.push({
                    index: index,
                    image: media.image ? getImages : '',
                    video: media.video ? getVideo : '',
                    title: media.title,
                });

                // Get DOM element
                const likeContainer = document.querySelectorAll('.gallery-media-likes');
                const galleryMedia = document.querySelectorAll('.gallery-media')
                const figureMedia = document.querySelectorAll('figure');

                // Loop on all media for display modal
                for (let i = 0; i < figureMedia.length; i++) {
                    let thumb = figureMedia[i];
                    thumb.classList.add(`figure_${i}`);

                    let focusMedia = galleryMedia[i]

                    focusMedia.addEventListener('keyup', (e) => {
                        if (e.key == 'Enter') {
                        showModalMedia(i, modalMedia);
                        }
                    })

                    thumb.addEventListener('click', () => {
                        // Display Modal media
                        showModalMedia(i, modalMedia);
                    });
                }
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
                            // Set id of media in localStorage
                            localStorage.removeItem(`${id}`);
                            // Decrements like of selected media
                            like--;
                            // Update likes user in localStorage
                            const getItemInLocalStorage = localStorage.getItem(`${photographer.name} Likes`);
                            const parseArray = JSON.parse(getItemInLocalStorage);
                            parseArray.pop();
                            localStorage.setItem(`${photographer.name} Likes`, JSON.stringify(parseArray));
                            // Update Ui likes media
                            likes.innerHTML = like + ' ' + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                            // Update total likes
                            renderStickyInformation(AllLikes);
                        } else {
                            // Set id of media in localStorage
                            localStorage.setItem(`${id}`, 'liked');
                            // Increment like of selected media
                            like++;
                            // Update likes user in localStorage
                            const getItemInLocalStorage = localStorage.getItem(`${photographer.name} Likes`);
                            const parseArray = JSON.parse(getItemInLocalStorage);
                            parseArray.push(1);
                            localStorage.setItem(`${photographer.name} Likes`, JSON.stringify(parseArray));
                            // Update ui likes media
                            likes.innerHTML = like + ' ' + '<i class="fa-solid fa-heart" aria-label="likes"></i>';
                            // Update total likes
                            renderStickyInformation(AllLikes);
                        }
                    });
                }
            }
        });
    }

    function showModalMedia(currentIndex, array) {
        const modal = document.querySelector('.modal-media');
        // Open Modal Media
        modal.show();
        const main = document.querySelector('#main');
        // Reset Modal innerHtml
        modal.innerHTML = ' ';
        main.style.opacity = 0.2;
        main.style.pointerEvents = 'none';
        // Create modal
        modal.innerHTML += `
        <div id="box" aria-label="image closeup view">
            <figure>
                <img src=${array[currentIndex].image} tabindex="0" >
                <video controls="controls" autoplay><source src="${array[currentIndex].video}" type="video/mp4"></video>
                <figcaption>${array[currentIndex].title}</figcaption>
            </figure>
            <a class="prev" tabindex="0" aria-label="Previous image" >&#10094;</a>
            <a class="next" tabindex="0" aria-label="Next image" >&#10095;</a>
            <span tabindex="0" aria-label="Close dialog" >&#x2716;</span>
        </div>`;

        if (modal) {
            // Get modal DOM element 
            const currentImage = document.querySelector('#box').querySelector('img');
            // Add focus on media
            currentImage.focus();
            currentImage.style.display = 'none';
            const videoBox = document.querySelector('#box').querySelector('video');
            // Add focus on media
            videoBox.focus();
            videoBox.style.display = 'none';
            const currentSourceVideo = document.querySelector('#box').querySelector('video').querySelector('source');
            let figcaption = document.querySelector('figcaption');
            // Condition for display img element or video element
            if (array[currentIndex].image !== '') {
                currentImage.style.display = 'block';
            }
            if (array[currentIndex].video !== '') {
                videoBox.style.display = 'block';
            }

            // Add focus on the modal for keyboard control
            modal.focus();

            // Modal keyboard control
            modal.addEventListener('keyup', (e) => {
                if (e.key === 'Escape' || e.target.localName === 'span' && e.key === "Enter") {
                    modal.close();
                    main.style.opacity = 1;
                    main.style.pointerEvents = 'auto';
                }
                if (e.key === 'ArrowLeft' || e.key === 'Left' || e.target.localName === 'img' || 'video' && e.key === "Enter") {
                    currentIndex === 0 ? (currentIndex = array.length - 1) : currentIndex--;
                    if (array[currentIndex].image !== '') {
                        currentImage.src = array[currentIndex].image;
                        currentImage.style.display = 'block';
                        videoBox.style.display = 'none';
                    }
                    if (array[currentIndex].video !== '') {
                        currentSourceVideo.src = array[currentIndex].video;
                        videoBox.style.display = 'block';
                        videoBox.load();
                        currentImage.style.display = 'none';
                    }
                    figcaption.textContent = array[currentIndex].title;
                } else if (e.key === 'ArrowRight' || e.key === 'Right' || e.target.localName === 'img' || 'video' && e.key === "Enter") {
                    currentIndex < array.length - 1 ? currentIndex++ : (currentIndex = 0);
                    if (array[currentIndex].image !== '') {
                        currentImage.src = array[currentIndex].image;
                        currentImage.style.display = 'block';
                        videoBox.style.display = 'none';
                    }
                    if (array[currentIndex].video !== '') {
                        currentSourceVideo.src = array[currentIndex].video;
                        videoBox.style.display = 'block';
                        videoBox.load();
                        currentImage.style.display = 'none';
                    }
                    figcaption.textContent = array[currentIndex].title;
                }
            });

            const next = modal.querySelector('.next');
            // Event onClick for next media
            next.addEventListener('click', () => {
                currentIndex < array.length - 1 ? currentIndex++ : (currentIndex = 0);
                if (array[currentIndex].image !== '') {
                    currentImage.src = array[currentIndex].image;
                    currentImage.style.display = 'block';
                    videoBox.style.display = 'none';
                }
                if (array[currentIndex].video !== '') {
                    currentSourceVideo.src = array[currentIndex].video;
                    videoBox.style.display = 'block';
                    videoBox.load();
                    currentImage.style.display = 'none';
                }
                figcaption.textContent = array[currentIndex].title;
            });

            const prev = modal.querySelector('.prev');
            // Event onClick for previous media
            prev.addEventListener('click', () => {
                currentIndex === 0 ? (currentIndex = array.length - 1) : currentIndex--;
                if (array[currentIndex].image !== '') {
                    currentImage.src = array[currentIndex].image;
                    currentImage.style.display = 'block';
                    videoBox.style.display = 'none';
                }
                if (array[currentIndex].video !== '') {
                    currentSourceVideo.src = array[currentIndex].video;
                    videoBox.style.display = 'block';
                    videoBox.load();
                    currentImage.style.display = 'none';
                }
                figcaption.textContent = array[currentIndex].title;
            });
        }

        // Close modal media
        const spanClose = modal.querySelector('span');
        spanClose.addEventListener('click', () => {
            // modal.style.display = 'none';
            modal.close();
            main.style.opacity = 1;
            main.style.pointerEvents = 'auto';
        });
    }

    function renderStickyInformation(likes) {
        // Get DOM element for display information likes
        const sticky = document.querySelector('.photograph-sticky');
        if (photographer.id !== undefined && photographer.id === parseInt(urlId) && likes !== undefined) {
            sticky.innerHTML = '';
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

    renderStickyInformation(AllLikes);

    return { getDetailsHeader, renderMediasGallery };
}