import RenderLoading from "./common";

const render = RenderLoading();

export default class Api {
  constructor(options) {
    this.options = options;
  }

  async searchNews(word, dateFrom, dateTo) {
    const res = await fetch(
      `${this.options.baseUrl}` +
        `q=${word}&` +
        `from=${dateFrom}&` +
        `to=${dateTo}&` +
        "sortBy=popularity&" +
        "language=ru&" +
        "pageSize=100&" +
        `apiKey=${this.options.apiKey}`
    );

    if (res.ok) {
      render.search();
      const json = await res.json();
      return json;
    } else {
      throw new Error(`Ошибка: ${res.status}`);
    }
  }
}
