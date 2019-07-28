const cheerio = require("cheerio");
const Axios = require("axios");

const jumiaAsync = async(URL) =>{
    let dom;
    try{
        dom = await Axios.get(URL);
    }catch(err){
        console.log(err);
        return;
    }
    let $ = cheerio.load(dom.data);
    let items = [];

    //Locate Products in DOM
    $('.sku.-gallery').map((i,el)=>{
         // Get product details
        let price = Number($(el).find('span.price').children('span').next().attr('data-price') || 0);
        let name = $(el).find('span.name').text();
        let url = $(el).find('a.link').attr('href') || 'https://google.com';
        let item = {
            name,
            price,
            url,
        }
         items.push(item);
    });
    
    return items;
}

const jumiaGetDatesAsync = async(URL)=>{
    let date;
    try{
        let delivery = await Axios.get(URL);
        let $ = cheerio.load(delivery.data);
        $('section.sku-detail').each((i,el)=>{
            date = $(el).find('div.-delivery>span.-description').text();
        })
    }catch(err){
        console.log(err);
    }
    return date;
}

module.exports.jumiaAsync = jumiaAsync;
module.exports.jumiaDatesAsync = jumiaGetDatesAsync;