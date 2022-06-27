async function getData() {
    // Fetch all data in photographers.json
    const res = await fetch('data/photographers.json');
    // Parse the response on format json
    const json = await res.json();

    return {
        // Return array of data
        photographers: [...json.photographers],
        medias: [...json.media],
    };
}

async function getPhotographers() {
    // Fetch data to get only photographer
    const data = await getData();

    return {
        // Return array of photographer
        photographers: [...data.photographers],
    };
}

async function getMedias() {
    // Fetch data to get only medias
    const data = await getData();

    return {
        // Return array of medias
        medias: [...data.medias],
    };
}