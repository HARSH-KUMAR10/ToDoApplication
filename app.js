const express = require('express')
const app = express()
const pool = require('./login-register/pool');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/html/front.html");
});

app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/login-register/register.html');
})

app.post('/register_user',urlencodedParser,(req,res)=>{
var email = req.body.email;
var pass = req.body.pass;
var sql = "insert into user values('"+email+"','"+pass+"')";
pool.query(sql,(err,result)=>{
    if(err){
        res.sendFile(__dirname+"/login-register/error.html");
    }else{
        res.sendFile(__dirname+"/login-register/login.html");
    }
});
});

/*
Assigning port number to the application
*/
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
app.use(express.static('./login-register'));