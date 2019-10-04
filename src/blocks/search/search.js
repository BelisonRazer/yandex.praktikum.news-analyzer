import sendForm from '../../js/validateForm';
import Api from '../../js/api';
import RenderLoading from '../../js/common';
import {CardList} from '../news-card/news-card';
import {showMoreBtn} from '../../js/common';
import {weekAgo} from '../../js/common';


const render = RenderLoading();
const form = document.forms.searchForm;
const inputSearch = form.elements.inputSearch;
const itemList = document.querySelector('.news-card__item-container');
const newsCardLinkToAnalytics = document.querySelector('.news-card__link-to-analytics');

const api = new Api({
    baseUrl: 'https://newsapi.org/v2/everything?',
    apiKey: 'bf58748c05fd4c08858c83cd3fe58654'
});

// dateFrom.setDate(dateFrom.getDate() - 7).toLocaleString();
const dateFrom = new Date(new Date().getTime() - weekAgo);
const dateTo = new Date();

class Search {
    async handleSearchClick(e) {
        this.clear();
        e.preventDefault();
        sendForm();

        await api.searchNews(inputSearch.value, dateFrom.toISOString(), dateTo.toISOString()).then((list) => {
        
            const word = inputSearch.value.trim();
            this.saveLocalStorageData(list);
            this.saveLocalStorageWord(word);
            const LSData = JSON.parse(localStorage.getItem('data'));

            if(LSData.articles.length === 0) {
                render.notFound();
                showMoreBtn(false);
            } else if (LSData.articles.length > 3) {
                new CardList(itemList, LSData);
                showMoreBtn(true);
                render.viewCard();
            } else {
                new CardList(itemList, LSData);
                showMoreBtn(false);
                render.viewCard();
            }

        }).catch((err) => {
            console.log(err);
        });
        
        inputSearch.classList.add('err');
    }

    saveLocalStorageData(data) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    saveLocalStorageWord(word) {
        localStorage.setItem('word', JSON.stringify(word));
    }

    clear() {
        localStorage.clear();

        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
};

const search = new Search();

/**
 * Доработка алгоритма:
 * 1. При возврате из статистики на главную - отрисовываются карточки
 * 2. Очищается LS
 * 3. При перезагрузке главной страницы - карточек уже не будет.
 * 4. Если снова была нажата кнопка просмотра статистики(к тем же данным), они снова сохраняются в LS
 */
window.onload = function() {
    if(localStorage.getItem('word') !== null && localStorage.getItem('data') !== null) {
        const word = JSON.parse(localStorage.getItem('word'));
        const LSData = JSON.parse(localStorage.getItem('data'));

        inputSearch.value = word; 

        if(LSData.articles.length === 0) {
            render.notFound();
            showMoreBtn(false);
        } else if (LSData.articles.length > 3) {
            new CardList(itemList, LSData);
            showMoreBtn(true);
            render.viewCard();
        } else {
            new CardList(itemList, LSData);
            showMoreBtn(false);
            render.viewCard();
        }

        function returnInStatisticAfterLSClear() {

            if(word === inputSearch.value) {
                localStorage.setItem('data', JSON.stringify(LSData));
                localStorage.setItem('word', JSON.stringify(word));
            } else {
                const wordNew = JSON.parse(localStorage.getItem('word'));
                const LSDataNew = JSON.parse(localStorage.getItem('data'));
                
                localStorage.setItem('data', JSON.stringify(LSDataNew));
                localStorage.setItem('word', JSON.stringify(wordNew));
            }
        }

        localStorage.clear();
        newsCardLinkToAnalytics.addEventListener('click', returnInStatisticAfterLSClear);
    }
};

form.addEventListener('submit', (e) => search.handleSearchClick(e));