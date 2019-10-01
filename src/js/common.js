import "../style.css";

export const monthList = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря'
}

export default function RenderLoading() {

    const searchPreloader = document.querySelector('.news-card__search');
    const searchNotFound = document.querySelector('.news-card__not-found');
    const newsCardList = document.querySelector('.news-card__list');

    function search() {
        searchPreloader.style.display = 'block';
        searchNotFound.style.display = 'none';
        newsCardList.style.display = 'none';
    }

    function notFound() {
        searchPreloader.style.display = 'none';
        searchNotFound.style.display = 'flex';
        newsCardList.style.display = 'none';
    }

    function viewCard() {
        newsCardList.style.display = 'flex';
        searchNotFound.style.display = 'none';
        searchPreloader.style.display = 'none';
    }

    return {
        search,
        notFound,
        viewCard
    }
};

export function showMoreBtn(show) {

    const showMoreB = document.querySelector('.news-card__button-show-more');

    if(show) {
        showMoreB.style.display = 'block';
    } else {
        showMoreB.style.display = 'none';
    }
}
