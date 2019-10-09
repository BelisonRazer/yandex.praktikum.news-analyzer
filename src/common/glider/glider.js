import ApiGithub from "../../js/api-github";
import {
  CardCommitList,
  CardBulletsList
} from "../../blocks/github/github-card-list";

const glideList = document.querySelector(".glide__slides");
const glideBulletList = document.querySelector(".glide__bullets");
const apiGithub = new ApiGithub({
  GIT_URL:
    "https://api.github.com/repos/BelisonRazer/yandex.praktikum.news-analyzer/commits"
});

class GliderDate {
  async push() {
    await apiGithub
      .getCommit()
      .then(list => {
        new CardCommitList(glideList, list);
        new CardBulletsList(glideBulletList, list);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

new GliderDate().push();
