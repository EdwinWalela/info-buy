const request = require("request");
const cheerio = require("cheerio");
const Axios = require("axios");

const query = 'huawei';

// URLs to scrap
const JUMIA_URL = `https://www.jumia.co.ke/catalog/?q=${query}`;

// Jumia Crawler
let jumiaCrawler = (URL) => {
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
            let price = $(el).find('span.price').children('span').next().attr('data-price') || 'N/A';
            let name = $(el).find('span.name').text();
            let url = $(el).find('a.link').attr('href');
            let date;

            // Get item's delivery date
            if(url){
                try{
                    delivery = await Axios.get(url);
                    let $ = cheerio.load(delivery.data);
                    $('section.sku-detail').each((i,el)=>{
                        date = $(el).find('span.-description').text();
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

// crawl websites
jumiaCrawler(JUMIA_URL);