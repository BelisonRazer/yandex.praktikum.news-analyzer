const itemList = document.querySelector('.news-card__item-container');

export default class Card {
    constructor(eImageURL, eDate, eLabel, eText, eSource) {
        this.cardElement = this.create(eImageURL, eDate, eLabel, eText, eSource);
    }

    create(imageURL, date, label, text, source) {
        if ('content' in document.createElement('template')) {
            const templ = document.querySelector('.template');
            const cardItem = templ.content.querySelector('.news-card__item');
            const cardImage = templ.content.querySelector('.news-card__image');
            const cardDate = templ.content.querySelector('.news-card__date');
            const cardLabel = templ.content.querySelector('.news-card__label');
            const cardCorrect = templ.content.querySelector('.news-card__correct');
            const cardCorrectInner = templ.content.querySelector('.news-card__correct-inner');
            const cardText = templ.content.querySelector('.news-card__text');
            const cardSource = templ.content.querySelector('.news-card__source');

            cardImage.style.backgroundImage = `url(${imageURL})`;
            cardDate.textContent = date;
            cardLabel.textContent = label;
            cardText.textContent = text;
            cardSource.textContent = source;

            const container = document.importNode(templ.content, true);
            return container;
        } else {
            console.log('Тег <template> не поддерживается браузером');

            const container = document.createDocumentFragment();
            const cardItem = document.createElement('div');
            const cardImage = document.createElement('div');
            const cardDate = document.createElement('p');
            const cardLabel = document.createElement('h3');
            const cardCorrect = document.createElement('div');
            const cardCorrectInner = document.createElement('div');
            const cardText = document.createElement('p');
            const cardSource = document.createElement('p');

            cardCorrectInner.appendChild(cardText);
            cardCorrect.appendChild(cardCorrectInner);
            cardItem.appendChild(cardImage);
            cardItem.appendChild(cardDate);
            cardItem.appendChild(cardLabel);
            cardItem.appendChild(cardCorrect);
            cardItem.appendChild(cardSource);
            container.appendChild(cardItem);

            cardImage.style.backgroundImage = `url(${imageURL})`;
            cardDate.textContent = date;
            cardLabel.textContent = label;
            cardText.textContent = text;
            cardSource.textContent = source;
            
            cardItem.classList.add('.news-card__item');
            cardImage.classList.add('.news-card__image');
            cardDate.classList.add('.news-card__date');
            cardLabel.classList.add('.news-card__label');
            cardCorrect.classList.add('.news-card__correct');
            cardCorrectInner.classList.add('.news-card__correct-inner');
            cardText.classList.add('.news-card__text');
            cardSource.classList.add('.news-card__source');

            return container;
        }
    }
}

export class CardList {
    constructor(container, serverCard) {
        this.container = container;
        this.serverCard = serverCard;
        this.render();
    }

    addCard(eImageURL, eDate, eLabel, eText, eSource) {
        const { cardElement } = new Card(eImageURL, eDate, eLabel, eText, eSource);
        this.container.appendChild(cardElement);
    }

    render() {
        if (itemList.getElementsByClassName('news-card__item').length === 0) {
            for (let i = 0; i < this.serverCard.length; i++) {

                const monthList = {
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

                const dayConvert = new Date(this.serverCard[i].publishedAt);
                const year = dayConvert.getFullYear();
                const month = dayConvert.getMonth();
                const dt = dayConvert.getDate();
                const resultDate = `${dt} ${monthList[month]}, ${year}`;

                this.addCard(this.serverCard[i].urlToImage, resultDate, this.serverCard[i].title, this.serverCard[i].description, this.serverCard[i].source.name); 
            }
        } 
    }
}