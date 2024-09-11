import axios from "axios";
const config = require('../configuracoes.json')

// AQUI É REALIZADO A COMUNICAÇÃO COM O BACK
const ipC = config.m2.ipC;
let token
// const apiC = axios.create({
//   baseURL: 'https://' + ipC,
// });
const apiC = axios.create({
  baseURL: 'http://' + ipC,
});

// function pegarToken() {
//   token = JSON.parse(localStorage.getItem("keyToken"))
//   apiC.defaults.headers.common['x-access-token'] = token;
// }
// setInterval(pegarToken, 1000);




export { apiC };