import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burger-builder-ea9c2.firebaseio.com/'
});

export default instance;