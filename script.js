const access = 'F7kID8UamezWJRTtdEf3m0WVLVjklnVHdAYcaeFOx-I';
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box'); // Corrected ID
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = '';
let page = 1;

async function searchEngine() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access}`;

    const response = await fetch(url);
    const data = await response.json();
    const results = data.results; 

    results.forEach((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imagelink = document.createElement('a');
        imagelink.href = result.links.html; 
        imagelink.target = '_blank';

        imagelink.appendChild(image);
        searchResult.appendChild(imagelink);
    });

    if (data.total_pages > page) {
        showMoreBtn.style.display = 'block';
    } else {
        showMoreBtn.style.display = 'none';
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = '';
    searchEngine();
});

showMoreBtn.addEventListener('click', () => {
    page++;
    searchEngine();
});
