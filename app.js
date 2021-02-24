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

app.get('/getTotalUsers',(req,res)=>{
    pool.query('select * from user',(err,result)=>{
        var object = {};
        if(err){
            object.count=0;
            res.json(object);
        }else{
            object.count=result.length;
            res.json(object);
        }
    });
});


app.get('/getTotalTasks',(req,res)=>{
    pool.query('select * from task',(err,result)=>{
        var object = {};
        if(err){
            object.count=0;
            res.json(object);
        }else{
            object.count=result.length;
            res.json(object);
        }
    });
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
    secret: 'ToDoApp', 
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
        res.sendFile(__dirname+'login-result/error.html');
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
    var sql = "insert into task(email,task_desc) values('"+email+"','"+newTask+"')";
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

app.get('/deleteTask',(req,res)=>{
var taskName = req.query.taskName;
var email = req.session.email;
var sql = "delete from task where task_desc='"+taskName+"' and email='"+email+"'";
pool.query(sql,(err,result)=>{
    var response = {};
    if(err){
        response.found=false;
        res.json(response);
    }else{
        response.found=true;
        res.json(response);
    }
});
});


/*
logout
*/
app.get('/logout',(req,res)=>{
req.session.destroy;
res.sendFile(__dirname+'/login-register/login.html');
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
app.listen(process.env.PORT || 8001,(e)=>{
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