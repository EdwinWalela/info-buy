// Load Crawlers
const jumiaCrawler = require("./src/crawlers/jumia");
const kilimallCrawler = require("./src/crawlers/kilimall");
const pigiameCrawler = require("./src/crawlers/pigiame");
const jijiCrawler = require("./src/crawlers/jiji"); //TO FIX

// Search query
const query = 'iphone+x';

// URLs to scrap
const JUMIA_URL = `https://www.jumia.co.ke/catalog/?q=${query}`;
const KILIMALL_URL =`https://www.kilimall.co.ke/?act=search&keyword=${query}`;
const PIGIAME_URL = `https://www.pigiame.co.ke/classifieds?q=${query}`;
const JIJI_URL = `https://jiji.co.ke/search?query=${query}`;

(async function(){
    let jumiaRes = await jumiaCrawler.jumiaAsync(JUMIA_URL);
    let kilimallRes = await kilimallCrawler.kilimallAsync(KILIMALL_URL);
    let pigiameRes = await pigiameCrawler(PIGIAME_URL);
    let jijiRes = await jijiCrawler(JIJI_URL);
}())





 


