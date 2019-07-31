const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const spiderRoutes = require("./src/routes/api");
///
app.use(cors());

app.use('/api/v1',spiderRoutes);

app.get('/',(req,res)=>{
    res.send("<a href='https://documenter.getpostman.com/view/4654837/SVYkw1vv?version=latest'>See Documentation</a>")
})

app.listen(PORT,()=>{
    console.log(`listening to requests on port ${PORT}`);
})
