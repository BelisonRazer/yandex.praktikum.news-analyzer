import { monthList, correcting } from "../../js/common";

const showMoreB = document.querySelector(".news-card__button-show-more");

export default class Card {
  constructor(eImageURL, eDate, eLabel, eText, eSource) {
    this.cardElement = Card.create(eImageURL, eDate, eLabel, eText, eSource);
  }

  static create(imageURL, date, label, text, source) {
    if ("content" in document.createElement("template")) {
      const templ = document.querySelector(".template");
      const cardImage = templ.content.querySelector(".news-card__image");
      const cardDate = templ.content.querySelector(".news-card__date");
      const cardLabel = templ.content.querySelector(".news-card__label");
      const cardText = templ.content.querySelector(".news-card__text");
      const cardSource = templ.content.querySelector(".news-card__source");

      cardImage.setAttribute("src", `${imageURL}`);
      cardImage.setAttribute(
        "alt",
        `Изображение от новостного сервиса: ${source}`
      );
      cardDate.textContent = date;
      cardLabel.textContent = label;
      cardText.textContent = text;
      cardSource.textContent = source;

      const container = document.importNode(templ.content, true);
      return container;
    } else {
      console.log("Тег <template> не поддерживается браузером");

      const container = document.createDocumentFragment();
      const cardItem = document.createElement("div");
      const cardBox = document.createElement("div");
      const cardImage = document.createElement("div");
      const cardDate = document.createElement("p");
      const cardLabel = document.createElement("h3");
      const cardCorrect = document.createElement("div");
      const cardCorrectInner = document.createElement("div");
      const cardText = document.createElement("p");
      const cardSource = document.createElement("p");

      cardCorrectInner.appendChild(cardText);
      cardCorrect.appendChild(cardCorrectInner);
      cardBox.appendChild(cardImage);
      cardBox.appendChild(cardDate);
      cardBox.appendChild(cardLabel);
      cardBox.appendChild(cardCorrect);
      cardItem.appendChild(cardSource);
      cardItem.appendChild(cardBox);
      container.appendChild(cardItem);

      cardImage.style.backgroundImage = `url(${imageURL})`;
      cardDate.textContent = date;
      cardLabel.textContent = label;
      cardText.textContent = text;
      cardSource.textContent = source;

      cardItem.classList.add(".news-card__item");
      cardBox.classList.add(".news-card__box-content");
      cardImage.classList.add(".news-card__image");
      cardDate.classList.add(".news-card__date");
      cardLabel.classList.add(".news-card__label");
      cardCorrect.classList.add(".news-card__correct");
      cardCorrectInner.classList.add(".news-card__correct-inner");
      cardText.classList.add(".news-card__text");
      cardSource.classList.add(".news-card__source");

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
    for (let i = 0; i < this.serverCard.articles.length; i++) {
      const dayConvert = new Date(this.serverCard.articles[i].publishedAt);
      const year = dayConvert.getFullYear();
      const month = dayConvert.getMonth();
      const dt = dayConvert.getDate();
      const resultDate = `${dt} ${monthList[month]}, ${year}`;

      this.addCard(
        this.serverCard.articles[i].urlToImage,
        resultDate,
        this.serverCard.articles[i].title,
        this.serverCard.articles[i].description,
        this.serverCard.articles[i].source.name
      );
    }
    const cardImages = document.querySelector(".news-card__image");
    cardImages.onload = function() {
      CardList.showRenderCard();
    };
  }

  static showRenderCard() {
    showMoreB.addEventListener("click", CardList.showMore);
    const card = document.querySelectorAll(".news-card__item");

    // если меньше 3 - проверка для избежания ошибки на 3 итерацию цикла.
    // обрезание текста
    for (let i = 0; i <= 2; i++) {
      if (card[i]) {
        card[i].classList.add("on");
        correcting(card[i]);
      }
    }
  }

  static showMore(e) {
    e.preventDefault();

    const on = document.querySelectorAll(".on");
    let next = on[on.length - 1].nextElementSibling;
    let index = 0;
    const step = 3;

    while (index < step) {
      if (next) {
        next.classList.add("on");
        correcting(next);
        next = next.nextElementSibling;
        index++;
      } else {
        showMoreB.style.display = "none";
        break;
      }
    }
  }
}
