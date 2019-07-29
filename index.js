const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const spiderRoutes = require("./src/routes/api");

app.listen(PORT,()=>{
    console.log(`listening to requests on port ${PORT}`);
})

app.use('/api/v1',spiderRoutes);

app.get('/',(req,res)=>{
    res.send({
        msg:"Hello World!"
    })
})
