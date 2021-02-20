const express = require('express')
const app = express()
const pool = require('./login-register/pool');
var bodyParser = require('body-parser');  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const session = require('express-session')


/*
Front Page
*/
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/html/front.html");
});

/*
Register new users
*/
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
Login 
*/

app.use(session({ 
    secret: 'Your_Secret_Key', 
    resave: true, 
    saveUninitialized: true
}));

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+"/login-register/login.html");
});

app.post('/loginUser',urlencodedParser,(req,res)=>{
var email = req.body.email;
var pass = req.body.pass;
var sql = "select * from user where email='"+email+"'and password='"+pass+"';";
pool.query(sql,(err,result)=>{
    if(err){
        res.send(err);
    }else{
        req.session.email=email;
        req.session.pass=pass;
        res.sendFile(__dirname+"/ToDo/todo.html");
    }
})
})

app.get('/session',(req,res)=>{
    res.send(req.session.email+" "+req.session.pass);
})


/*
add task
*/
app.get('/newTaskAdd',(req,res)=>{
    var newTask = req.query.newTask;
    var email = req.session.email;
    var sql = 'insert into task(email,task_desc) values('+email+"','"+newTask+"')";
    pool.query(sql,(err,result)=>{
        if(err){
            res.json(result);
        }else{
            res.json(result);
        }
    });
});

app.get('/getAllTask',(req,res)=>{
    var email = req.session.email;
    var sql = "select * from task where email='"+email+"'";
    pool.query(sql,(err,result)=>{
        res.json(result);
    });
});

/*
todo
*/
app.get('/todo',(req,res)=>{
    res.sendFile(__dirname+'/ToDo/todo.html');
})
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
app.use(express.static('./ToDo'));