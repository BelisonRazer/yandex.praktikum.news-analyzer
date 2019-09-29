import "../style.css";
import "../common/glider/glider";

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
