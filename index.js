const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const spiderRoutes = require("./src/routes/api");
///
app.use(cors());

app.use('/api/v1',spiderRoutes);

app.get('/',(req,res)=>{
    res.send({
        msg:"Hello World!"
    })
})

app.listen(PORT,()=>{
    console.log(`listening to requests on port ${PORT}`);
})
