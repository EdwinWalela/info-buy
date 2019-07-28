const cheerio = require("cheerio");
const Axios = require("axios");

const jijiCrawlerAsync = async(URL)=>{
    let dom;
    try{
        dom = await Axios.get(URL);
    }catch(err){
        console.log(err);
        return;
    }
    let $ = cheerio.load(dom.data);
    let items = [];
    console.log($('div.h-flex-1-1-100.h-ph-0').html())
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

        items.push(item)
    })
    return items.filter(item=>{
        return item.name !== '';
    });
}

module.exports = jijiCrawlerAsync;

