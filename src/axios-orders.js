import axios from 'axios';


const instance = axios.create({
    baseURL: `https://burger-app-8ed4f-default-rtdb.firebaseio.com/`
});

export default instance;

