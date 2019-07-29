const router = require("express").Router();

// Load Crawlers
const jumiaCrawler = require("../crawlers/jumia");
const kilimallCrawler = require("../crawlers/kilimall");
const pigiameCrawler = require("../crawlers/pigiame");


router.get('/spider',async(req,res)=>{
    let query = req.query.q;
    let source = req.query.src;
    let condition = req.query.condition;
    let sources = [];
    let resultCount = 0;
    let data = {};
    let sort = req.query.sort || 'asc';
    let limit = req.query.limit;
    let best = req.query.best;
    console.log(best)

    if(query==="" || typeof query === "undefined"){
        res.status(400).send({
            msg:"Query missing"
        })
        return;
    }

    // URLs to scrap
    const JUMIA_URL = `https://www.jumia.co.ke/catalog/?q=${query}`;
    const KILIMALL_URL =`https://www.kilimall.co.ke/?act=search&keyword=${query}`;
    const PIGIAME_URL = `https://www.pigiame.co.ke/classifieds?q=${query}`;

    // Scrap websites
    let jumia = await jumiaCrawler.jumiaAsync(JUMIA_URL);
    let kilimall = await kilimallCrawler.kilimallAsync(KILIMALL_URL);
    let pigiame = await pigiameCrawler(PIGIAME_URL);
    
    if(typeof limit !== "undefined"){
        limit = Number(limit);
        jumia = jumia.slice(0,limit);
        kilimall = kilimall.slice(0,limit);
        pigiame = pigiame.slice(0,limit);
    } 

    let ascendingSort = (a,b)=>{
        if(a.price > b.price){
            return 1;
        }
        if(a.price < b.price){
            return -1;
        }
        return 0;
    };
    let descendingSort = (a,b)=>{
        if(a.price < b.price){
            return 1;
        }
        if(a.price > b.price){
            return -1;
        }
        return 0;
    }

    if(sort === 'asc'){
        jumia.sort(ascendingSort);
        kilimall.sort(ascendingSort);
        pigiame.sort(ascendingSort)
    }else if(sort === 'desc'){
        jumia.sort(descendingSort);
        kilimall.sort(descendingSort);
        pigiame.sort(descendingSort);
    }
    
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
                return item.condition === condition
            })
        }else{
            data.pigiame = pigiame
        }
        sources.push('pigiame')
        resultCount+=data.pigiame.length
    }else{  
        if(typeof best !== "undefined"){
            jumia.sort(ascendingSort);
            kilimall.sort(ascendingSort);
            pigiame.sort(ascendingSort);

            if(!query.includes("Case") || !query.includes("Cover")){
                jumia = jumia.filter(item=>{
                    return !(item.name.includes("Case") || item.name.includes("Cover"))
                })
                
                kilimall = kilimall.filter(item=>{
                    return !(item.name.includes("Case") || item.name.includes("Cover"))
                })
            }
            
            jumia = jumia.slice(0,1);
            kilimall = jumia.slice(0,1);
            pigiame = pigiame.slice(0,1);
        }
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

module.exports = router;