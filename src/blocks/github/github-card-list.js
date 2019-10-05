import Glide from '@glidejs/glide';
import {monthList} from '../../js/common';

export default class CardCommit {
    constructor(cName, cEmail, cDate, cMessage, cImageUrl) {
        this.cardElement = this.create(cName, cEmail, cDate, cMessage, cImageUrl);
    }

    create(name, email, date, message, imageUrl) {
        if ('content' in document.createElement('template')) {
            const template = document.querySelector('.template');
            const cardItem = template.content.querySelector('.glide__slide');
            const cardBox = template.content.querySelector('.slider__frame');
            const cardBoxInner = template.content.querySelector('.slider__card');
            const cardDate = template.content.querySelector('.slider__date');
            const cardText = template.content.querySelector('.slider__text');
            const cardInfoBox = template.content.querySelector('.slider__info-box');
            const cardImage = template.content.querySelector('.slider__image');
            const cardUser = template.content.querySelector('.silder__user');
            const cardUserName = template.content.querySelector('.slider__name');
            const cardUserEmail = template.content.querySelector('.slider__email');

            cardImage.style.backgroundImage = `url(${imageUrl})`;
            cardDate.textContent = date;
            cardUserName.textContent = name;
            cardUserEmail.textContent = email;
            cardText.textContent = message;

            const container = document.importNode(template.content, true);
            return container;
        } else {
            console.log('Тег <template> не поддерживается браузером');

            const container = document.createDocumentFragment();
            const cardItem = document.createElement('li');
            const cardBox = document.createElement('div');
            const cardBoxInner = document.createElement('div');
            const cardDate = document.createElement('p');
            const cardText = document.createElement('p');
            const cardInfoBox = document.createElement('div');
            const cardImage = document.createElement('div');
            const cardUser = document.createElement('div');
            const cardUserName = document.createElement('p');
            const cardUserEmail = document.createElement('p');

            cardUser.appendChild(cardUserName);
            cardUser.appendChild(cardUserEmail);
            cardInfoBox.appendChild(cardUser);
            cardInfoBox.appendChild(cardImage);
            cardBoxInner.appendChild(cardDate);
            cardBoxInner.appendChild(cardText);
            cardBoxInner.appendChild(cardInfoBox);
            cardBox.appendChild(cardBoxInner);
            cardItem.appendChild(cardBox);
            container.appendChild(cardItem);
            

            cardImage.style.backgroundImage = `url(${imageUrl})`;
            cardDate.textContent = date;
            cardUserName.textContent = name;
            cardUserEmail.textContent = email;
            cardText.textContent = message;
            
            cardItem.classList.add('.glide__slide');
            cardBox.classList.add('.slider__frame');
            cardBoxInner.classList.add('.slider__card');
            cardDate.classList.add('.slider__date');
            cardText.classList.add('.slider__text');
            cardInfoBox.classList.add('.slider__info-box');
            cardImage.classList.add('.slider__image');
            cardUser.classList.add('.silder__user');
            cardUserName.classList.add('.slider__name');
            cardUserEmail.classList.add('.slider__email');

            return container;
        }
    }
}

export class CardBullets {
    constructor (numb) {
        this.cardElement = this.createBullets(numb);
    }

    createBullets(myNumb) {
        if ('content' in document.createElement('template')) {
            const template = document.querySelector('.template-bullets');
            const bullet = template.content.querySelector('.glide__bullet');

            bullet.setAttribute('data-glide-dir', `=${myNumb}`);

            const containerBullets = document.importNode(template.content, true);
            return containerBullets;
        } else {
            console.log('Тег <template> не поддерживается браузером');

            const containerBullets = document.createDocumentFragment();
            const bullet = document.createElement('button');

            containerBullets.appendChild(bullet);

            bullet.classList.add('.glide__bullet');
            
            return containerBullets;
        }
    }
}

export class CardBulletsList {
    constructor (container, count) {
        this.container = container;
        this.count = count;
        this.render();
    }

    addBullets(numb) {
        const { cardElement } = new CardBullets(numb);
        this.container.appendChild(cardElement);
    }

    render() {
        for (let i = 0; i < this.count.length; i++) {
            this.addBullets(i);
        }
    }
}

export class CardCommitList {
    constructor(container, serverCard) {
        this.container = container;
        this.serverCard = serverCard;
        this.render();
    }

    addCard(cName, cEmail, cDate, cMessage, cImageUrl) {
        const { cardElement } = new CardCommit(cName, cEmail, cDate, cMessage, cImageUrl);
        this.container.appendChild(cardElement);
    }

    render() {
        for (let i = 0; i < this.serverCard.length; i++) {

            const dayConvert = new Date(this.serverCard[i].commit.committer.date);
            const year = dayConvert.getFullYear();
            const month = dayConvert.getMonth();
            const dt = dayConvert.getDate();
            const resultDate = `${dt} ${monthList[month]}, ${year}`;

            this.addCard(this.serverCard[i].commit.committer.name, this.serverCard[i].commit.committer.email, resultDate, this.serverCard[i].commit.message, this.serverCard[i].author.avatar_url);
        }
        CardCommitList.createGlider();
    }

    static createGlider() {
        const glide = new Glide('.glide', {
            type: 'carousel',
            bound: true,
            perView: 2,
            focusAt: '2',
            startAt: 0,
            gap: 16,
            peek: {
                before: 313.500,
                after: 313.500,
            },
            breakpoints: {
                1439: {
                    type: 'slider',
                    perView: 3,
                    startAt: 0,
                    focusAt: 0,
                    gap: 8,
                    bound: true,
                    peek: {
                        before: 40,
                        after: 100,
                    },
                },
                1360: {
                    type: 'slider',
                    perView: 3,
                    startAt: 0,
                    focusAt: 0,
                    gap: 8,
                    bound: true,
                    peek: {
                        before: 40,
                        after: 100,
                    },
                },
                1330: {
                    type: 'slider',
                    perView: 3,
                    startAt: 0,
                    focusAt: 0,
                    gap: 8,
                    bound: true,
                    peek: {
                        before: 40,
                        after: 100,
                    },
                },
                1200: {
                    type: 'slider',
                    perView: 3,
                    startAt: 0,
                    focusAt: 0,
                    gap: 8,
                    bound: true,
                    peek: {
                        before: 40,
                        after: 40,
                    },
                },
                1110: {
                    type: 'slider',
                    perView: 2,
                    startAt: 0,
                    focusAt: 0,
                    gap: 8,
                    bound: true,
                    peek: {
                        before: 40,
                        after: 40,
                    },
                },
                768: {
                    type: 'slider',
                    perView: 2,
                    startAt: 0,
                    focusAt: 0,
                    gap: 8,
                    bound: true,
                    peek: {
                        before: 8,
                        after: 16,
                    },
                },
                615: {
                    type: 'slider',
                    perView: 1,
                    startAt: 0,
                    focusAt: 0,
                    gap: 8,
                    bound: true,
                    peek: {
                        before: 8,
                        after: 16,
                    },
                },
            }
        });
        glide.mount();
    }
}

