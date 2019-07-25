const request = require("request");
const cheerio = require("cheerio");
const Axios = require("axios");

const query = 'huawei+y7';

// URLs to scrap
const JUMIA_URL = `https://www.jumia.co.ke/catalog/?q=${query}`;
const KILIMALL_URL =`https://www.kilimall.co.ke/?act=search&keyword=${query}`;
const JIJI_URL = `https://jiji.co.ke/search?query=${query}`;
const PIGIAME_URL = `https://www.pigiame.co.ke/classifieds?q=${query}`;

// Jumia Crawler
const jumiaCrawler = (URL) => {
    // Send request
    request(URL,(err,res,body)=>{
        if(err){
            console.log('error\n',err);
        }
        // Parse DOM
        let $ = cheerio.load(body);
    
        //Locate Products in DOM
        $('.sku.-gallery').each(async(i,el)=>{
            // Get product details
            let price = Number($(el).find('span.price').children('span').next().attr('data-price') || 0);
            let name = $(el).find('span.name').text();
            let url = $(el).find('a.link').attr('href');
            let date;

            // Get item's delivery date
            if(url){
                try{
                    let delivery = await Axios.get(url);
                    let $ = cheerio.load(delivery.data);
                    $('section.sku-detail').each((i,el)=>{
                        date = $(el).find('div.-delivery>span.-description').text();
                    })
                }catch(err){
                    console.log(err);
                }
            }
            
            let item = {
                name,
                price,
                url,
                date
            }
            if(item.name !== ''){
                console.log(item);
            }
        })
    })
}

// Kilimall Crawler
const kilimalCrawler = (URL) => {
       // Send request
       request(URL,(err,res,body)=>{
        if(err){
            console.log('error\n',err);
        }
        // Parse DOM
        let $ = cheerio.load(body);
    
        //Locate Products in DOM
        $('ul.list_pic>li.item').each(async(i,el)=>{
            // Get product details
            let price = $(el).find('div.goods-price-info.clearfix>div.goods-price>em').text();
            // Format price
            price = Number(price.replace("KSh","").trim().replace(",",""));

            let name = $(el).find('div.goods-info>h2.goods-name>a').text().trim();
            let url = $(el).find('div.goods-info>h2.goods-name>a').attr('href');
            let date;
      
            if(url){
                try{
                    let delivery = await Axios.get(url);
                    let $ = cheerio.load(delivery.data);
                    date = $('div.goods_logistics_desc>div>span').text().replace(".","").trim();
                }catch(err){
                    console.log(err);
                }
            }
                  
            let item = {
                name,
                price,
                url,
                date
            }

            console.log(item)
        })
    })
}

const jijiCrawler = (URL) => {
 // Send request
    request(URL,(err,res,body)=>{
        if(err){
            console.log('error\n',err);
        }
        // Parse DOM
        let $ = cheerio.load(body);

        //Locate Products in DOM
        $('div.h-flex-1-1-100.h-ph-0>div.b-list-advert__item.js-handle-click-ctr.js-advert-link').each((i,el)=>{
            // Get product details
            let name = $(el).find('a.qa-advert-title.js-advert-link').text().trim();
            let price = $(el).find('div.b-list-advert__item-price>span').text().trim();
            price = Number(price.replace("KSh","").trim().replace(",",""));
            let url = $(el).find('a.qa-advert-title.js-advert-link').attr('href');
            let condition =  $(el).find('small.b-list-advert__item-attr').text();
           
            if(condition.includes("New") || name.includes('New')){
                condition = 'new'
            }else{
                condition = 'used'
            }

            let item = {
                name,
                price,
                url,
                condition
            }

            console.log(item)
        })
    })
}

const pigiameCrawler = (URL) => {
   // Send request
   request(URL,(err,res,body)=>{
    if(err){
        console.log('error\n',err);
    }
    // Parse DOM
    let $ = cheerio.load(body);

    //Locate Products in DOM
    $('div.listings-cards__list-item').each((i,el)=>{
        // Get product details
        let name = $(el).find('div.listing-card__header__title').text().trim();
        let price = $(el).find('span.listing-card__price__value').text().trim();
        price = Number(price.replace("KSh","").trim().replace(",",""));
        let url = $(el).find('a').attr('href');
        let condition =  $(el).find('div.listing-card__header__tags').text();
       

        if(condition.includes("New") || name.includes('New')){
            condition = 'new'
        }else{
            condition = 'used'
        }

        let item = {
            name,
            price,
            url,
            condition
        }
        console.log(item)
    })
}) 
}

// uncomment to crawl websites

// jumiaCrawler(JUMIA_URL);
// kilimalCrawler(KILIMALL_URL);
pigiameCrawler(PIGIAME_URL);
// jijiCrawler(JIJI_URL);