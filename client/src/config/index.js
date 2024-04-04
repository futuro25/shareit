const localConfig = {
  hostname: "localhost",
  baseUrl: "http://localhost:3000",
  devMode: true,
  brand: "ShareIt",
}

const devConfig = {
  hostname: "share-it-7013201cfe7b.herokuapp.com",
  baseUrl: "https://share-it-7013201cfe7b.herokuapp.com",
  devMode: false,
  devel: false,
  brand: "ShareIt",
}

const prodConfig = {
  hostname: "share-it-7013201cfe7b.herokuapp.com",
  baseUrl: "https://share-it-7013201cfe7b.herokuapp.com",
  devMode: false,
  devel: false,
  brand: "ShareIt",
}

let config;

if (window.location.hostname === localConfig.hostname) {
  console.log('env local')
  config = require("./local.config.js");  
}

if (window.location.hostname === devConfig.hostname) {
  console.log('env dev')
  config = require("./dev.config.js");  
}

if (window.location.hostname === prodConfig.hostname) {
  console.log('env prod')
  config = require("./prod.config.js");  
}

module.exports = config;