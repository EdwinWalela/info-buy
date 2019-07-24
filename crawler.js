const request = require("request");
const cheerio = require("cheerio");

// URL to scrap
const JUMIA_URL = "https://www.jumia.co.ke/catalog/?q=samsung+charger";

let jumiaCrawler = (URL) => {
    // Send request
    request(URL,(err,res,body)=>{
        if(err){
            console.log('error\n',err);
        }
        // Parse DOM
        let $ = cheerio.load(body);
    
        //Locate Products in DOM
        $('.products>.sku.-gallery').each((i,el)=>{
            let price = $(el).find('a.link>div.price-container.clearfix>.price-box.ri>span.price').children('span').next().attr('data-price');
            let name = $(el).find('a.link>h2.title>span.name').text();
            
            console.log('ksh.'+price+' - '+name);
        })
    })
}
// crwal websites
jumiaCrawler(JUMIA_URL);