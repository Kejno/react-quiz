import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-kejno.firebaseio.com/'
})