// import "../style.css";

const button = document.querySelector('.header__button');
const search = document.querySelector('.news-card__search');
const notFound = document.querySelector('.news-card__not-found');

function notFounds() {
    search.style.display = 'none';
    notFound.style.display = 'flex';
}

function searching() {
    search.style.display = 'block';
    setTimeout(notFounds, 5000);
}

function showStatus(e) {
    e.preventDefault();
    searching();
}

button.addEventListener('click', showStatus);

