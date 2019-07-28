// Load Crawlers
const jumiaCrawler = require("./src/crawlers/jumia");
const kilimallCrawler = require("./src/crawlers/kilimall");
const pigiameCrawler = require("./src/crawlers/pigiame");
// const jijiCrawler = require("./src/crawlers/jiji"); //TO FIX

// Search query
const query = 'iphone+x';

// URLs to scrap
const JUMIA_URL = `https://www.jumia.co.ke/catalog/?q=${query}`;
const KILIMALL_URL =`https://www.kilimall.co.ke/?act=search&keyword=${query}`;
const PIGIAME_URL = `https://www.pigiame.co.ke/classifieds?q=${query}`;
// const JIJI_URL = `https://jiji.co.ke/search?query=${query}`;

(async function(){
    let jumia = await jumiaCrawler.jumiaAsync(JUMIA_URL);
    let kilimall = await kilimallCrawler.kilimallAsync(KILIMALL_URL);
    let pigiame = await pigiameCrawler(PIGIAME_URL);
    // let jiji = await jijiCrawler(JIJI_URL);

    let res = {
        // jumia,
        kilimall,
        // pigiame,
    }
    console.log(res);
}())





 


