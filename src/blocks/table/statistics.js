import {weekDay} from '../../js/common';

export default class Statistics {

    constructor (word, data) {
        this.word = word;
        this.data = data;
        this.titleCount();
        this.perDay();
    }

    titleCount() {
        let count = 0;
        // console.log(this.data);
        this.data.articles.forEach(element => {
            if (element.title.toLowerCase().includes(this.word.toLowerCase())) {
                count++;
            }
        });
        this.viewStatistics(count);
    }

    perDay() {
        const artPerDay = {};

        this.data.articles.forEach(element => {
            const date = new Date(element.publishedAt.substring(0, 10)).getDate();

            if (date in artPerDay) {
                artPerDay[date]++;
            } else {
                artPerDay[date] = 1;
            }
        });

        this.toGraph(artPerDay);
    }

    viewStatistics(count) {
        document.querySelector('.answer__title-word').textContent = this.word;
        document.querySelector('.answer__weekly-count').textContent = this.data.totalResults;
        document.querySelector('.answer__headlines-count').textContent = count;
    }

    toGraph(artPerDay) {
        const weekAgoNew = new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000);

        for (let i = 0; i <= 6; i++) {
            const dayMs = i * 24 * 60 * 60 * 1000;
            const date = new Date(weekAgoNew.getTime() + dayMs);
            const day = date.getDate();
            const wday = weekDay[`${date.getDay()}`].toLowerCase();

            // console.log(artPerDay);
            // console.log(`day: ${day}`);
            // console.log(artPerDay[`${day}`]);
            
            document.querySelector(`.day-${i}`).textContent = `${day}, ${wday}`;

            if(day in artPerDay) {
                // + 2.2 для случаев когда за один день количество меньше 5, иначе не видно белый текст count
                const widthOfPercent = artPerDay[`${day}`] * 100 / this.data.totalResults + 2.2;

                document.querySelector(`.graph-${i}`).style.width = `${widthOfPercent}%`;
                document.querySelector(`.numb-${i}`).textContent = `${artPerDay[`${day}`]}`;
            } else {
                document.querySelector(`.graph-${i}`).style.width = `1.70%`;
                document.querySelector(`.graph-${i}`).style.backgroundColor = `#ff0000`;
                document.querySelector(`.numb-${i}`).textContent = `0`;
            }
        }
    }
}