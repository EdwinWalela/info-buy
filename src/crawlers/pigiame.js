const cheerio = require("cheerio");
const Axios = require("axios");

const pigiameAsync = async(URL)=>{
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
     $('div.listings-cards__list-item').each((i,el)=>{
         // Get product details
         let name = $(el).find('div.listing-card__header__title').text().trim();
         let price = $(el).find('span.listing-card__price__value').text().trim();
         price = Number(price.replace("KSh","").trim().replace(",",""));
         let url = $(el).find('a').attr('href');
         let condition =  $(el).find('div.listing-card__header__tags').text();
        let thumb = $(el).find('img.listing-card__image__resource').attr('data-src');
        let source = "pigiame";

         if(condition.includes("New") || name.includes('New')){
             condition = 'new'
         }else{
             condition = 'used'
         }
 
         let item = {
             name,
             price,
             url,
             condition,
             thumb,
             source
         }
         items.push(item);
     })
     return items.filter(item=>{
         return item.name !== '';
     });
}

module.exports = pigiameAsync