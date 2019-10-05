import "../analytics.css";

import Statistics from '../blocks/table/statistics';

new Statistics(JSON.parse(localStorage.getItem('word')), JSON.parse(localStorage.getItem('data')));
