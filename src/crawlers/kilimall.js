const cheerio = require("cheerio");
const Axios = require("axios");

const kilimallAsync = async(URL)=>{
    let dom;
    try{
        dom = await Axios.get(URL);
    }catch(err){
        console.log(err);
        return;
    }
    let $ = cheerio.load(dom.data);
    let items = [];
    $('ul.list_pic>li.item').each((i,el)=>{
        // Get product details
        let price = $(el).find('div.goods-price-info.clearfix>div.goods-price>em').text();
        // Format price
        price = Number(price.replace("KSh","").trim().replace(",",""));

        let name = $(el).find('div.goods-info>h2.goods-name>a').text().trim();
        let url = $(el).find('div.goods-info>h2.goods-name>a').attr('href');
        let thumb = $(el).find('div.goods-pic>a.lazyload').attr('data-src')

        let item = {
            name,
            price,
            url,
            thumb
        }
        items.push(item);
    })
    return items;
}

const kilimallGetDatesAsync = async(URL)=>{
    let date;
    try{
        let delivery = await Axios.get(URL);
        let $ = cheerio.load(delivery.data);
        date = $('div.goods_logistics_desc>div>span').text().replace(".","").trim();
    }catch(err){
        console.log(err);
    }
    return date;
}  

module.exports.kilimallAsync = kilimallAsync;
module.exports.kilimallDatesAsync = kilimallGetDatesAsync;
