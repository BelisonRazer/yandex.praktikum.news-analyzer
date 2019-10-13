export const weekAgo = 6 * 24 * 60 * 60 * 1000;
export const weekDay = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
export const monthList = {
  0: "января",
  1: "февраля",
  2: "марта",
  3: "апреля",
  4: "мая",
  5: "июня",
  6: "июля",
  7: "августа",
  8: "сентября",
  9: "октября",
  10: "ноября",
  11: "декабря"
};

export default function RenderLoading() {
  const searchPreloader = document.querySelector(".news-card__search");
  const searchNotFound = document.querySelector(".news-card__not-found");
  const newsCardList = document.querySelector(".news-card__list");

  function search() {
    searchNotFound.style.display = "none";
    newsCardList.style.display = "none";
    searchPreloader.style.display = "block";
  }

  function notFound() {
    searchPreloader.style.display = "none";
    newsCardList.style.display = "none";
    searchNotFound.style.display = "flex";
  }

  function viewCard() {
    searchNotFound.style.display = "none";
    searchPreloader.style.display = "none";
    newsCardList.style.display = "flex";
  }

  return {
    search,
    notFound,
    viewCard
  };
}

export function showMoreBtn(show) {
  const showMoreB = document.querySelector(".news-card__button-show-more");

  if (show) {
    showMoreB.style.display = "block";
  } else {
    showMoreB.style.display = "none";
  }
}

// Обрезание текста -> in news-card
export function correcting(box) {
  const correctInner = box.querySelector(".news-card__correct-inner");
  const correctText = box.querySelector(".news-card__text");
  const text = correctText.innerHTML;
  const clone = document.createElement("div");

  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.width = `${correctInner.clientWidth}px`;
  clone.innerHTML = text;
  box.appendChild(clone);

  let l = text.length - 1;
  // eslint-disable-next-line prettier/prettier
  for (; l >= 0 && clone.clientHeight > correctInner.clientHeight; --l) {
    clone.innerHTML = `${text.substring(0, l)}...`;
  }

  correctText.innerHTML = clone.innerHTML;
  box.removeChild(clone);
}

const addEvent = function(object, type, callback) {
  if (object == null || typeof object === "undefined") return;
  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent(`on${type}`, callback);
  } else {
    // eslint-disable-next-line no-param-reassign
    object[`on${type}`] = callback;
  }
};

// Текст обрезается при уменьшении разрешения окна(при увеличении остается темже - до перезагрузки).
addEvent(window, "resize", function() {
  const cardView = document.querySelectorAll(".on");

  for (let i = 0; i <= cardView.length; i++) {
    if (cardView[i]) {
      correcting(cardView[i]);
    }
  }
});
