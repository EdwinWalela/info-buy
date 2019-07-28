const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


// Load Crawlers
const jumiaCrawler = require("./src/crawlers/jumia");
const kilimallCrawler = require("./src/crawlers/kilimall");
const pigiameCrawler = require("./src/crawlers/pigiame");

app.listen(PORT,()=>{
    console.log(`listening to requests on port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.send({
        msg:"Hello World!"
    })
})

app.get('/api/spider',async(req,res)=>{
    let query = req.query.q;
    let source = req.query.src;
    let condition = req.query.condition;

    let sources = [];
    let resultCount = 0;
    let data = {};

    // URLs to scrap
    const JUMIA_URL = `https://www.jumia.co.ke/catalog/?q=${query}`;
    const KILIMALL_URL =`https://www.kilimall.co.ke/?act=search&keyword=${query}`;
    const PIGIAME_URL = `https://www.pigiame.co.ke/classifieds?q=${query}`;

    // Scrap websites
    let jumia = await jumiaCrawler.jumiaAsync(JUMIA_URL);
    let kilimall = await kilimallCrawler.kilimallAsync(KILIMALL_URL);
    let pigiame = await pigiameCrawler(PIGIAME_URL);
    
    if(source === 'jumia'){
        data.jumia = jumia;
        sources.push('jumia');
        resultCount+=jumia.length
    }else if(source == 'kilimall'){
        data.kilimall = kilimall
        sources.push('kilimall')
        resultCount+=kilimall.length
    }else if(source == 'pigiame'){
        if(condition){
            data.pigiame = pigiame.filter(item=>{
                return item.condition == condition
            })
        }else{
            data.pigiame = pigiame
        }
        sources.push('pigiame')
        resultCount+=data.pigiame.length
    }else{
        data = {
            jumia,
            kilimall,
            pigiame
        }
        sources.push('jumia','kilimall','pigiame')
        resultCount+=(jumia.length+kilimall.length+pigiame.length)
    }
    
    res.send({
        query,
        results:resultCount,
        sources,
        data
    })
})

// (async function(){
//     let jumia = await jumiaCrawler.jumiaAsync(JUMIA_URL);
//     let kilimall = await kilimallCrawler.kilimallAsync(KILIMALL_URL);
//     let pigiame = await pigiameCrawler(PIGIAME_URL);
//     // let jiji = await jijiCrawler(JIJI_URL);

//     let res = {
//         // jumia,
//         // kilimall,
//         // pigiame,
//     }
//     console.log(res);
// }())





 


