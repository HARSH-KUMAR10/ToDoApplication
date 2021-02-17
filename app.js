const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/html/front.html");
});

app.listen(8001,(e)=>{
    if(e){
        console.log(e);
    }else{
        console.log("http://localhost:8001");
    }
});


/*
Folders included
*/
app.use(express.static('./html'));