export default class ApiGithub {
    constructor(options) {
        this.options = options;
    }

    async getCommit() {
        const res = await fetch(`${this.options.GIT_URL}`)

        if (res.ok) {
            const json = await res.json();
            return json;
        } else {
            throw new Error(`Ошибка: ${res.status}`);
        }
    }
}