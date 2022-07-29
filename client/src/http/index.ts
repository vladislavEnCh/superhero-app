import axios from 'axios';

const $req = axios.create({
  baseURL: 'http://localhost:5000/api/heroes',
});
export { $req };
