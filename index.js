const express = require('express');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const spiderRoutes = require("./src/routes/api");
///
app.use(cors());

app.use('/api/v1',spiderRoutes);

app.get('/',(req,res)=>{
    let data = "<a href='https://documenter.getpostman.com/view/4654837/SVYkw1vv?version=latest'>See Documentation</a>"
    data+="<br/><br/><a target='_blank' href='http://infobuyke.surge.sh'>Demo</a>"
    res.send(data);
})

app.listen(PORT,()=>{
    console.log(`listening to requests on port ${PORT}`);
})
