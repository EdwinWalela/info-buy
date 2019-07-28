const request = require("request");
const cheerio = require("cheerio");
const Axios = require("axios");

const query = 'iphone+x';

// URLs to scrap
const JUMIA_URL = `https://www.jumia.co.ke/catalog/?q=${query}`;
const KILIMALL_URL =`https://www.kilimall.co.ke/?act=search&keyword=${query}`;
const JIJI_URL = `https://jiji.co.ke/search?query=${query}`;
const PIGIAME_URL = `https://www.pigiame.co.ke/classifieds?q=${query}`;



 


