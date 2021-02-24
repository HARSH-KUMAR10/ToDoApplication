const tasks = document.getElementById('tasks');
const newtask = document.getElementById('newtask');
const result = document.getElementById('result');

function newTaskAdd(){
    console.log('adding new tasks');
    var task = newtask.value;
    console.log('task',task);
    newtask.value="";
    var url = 'newTaskAdd?newTask='+task;
    //var url='newTaskAdd';
    console.log('trying to send',url);
    fetch(url).
    then(response => response.json()).
    then(data => {
        result.innerHTML="url fetched";
        if(data){
            result.innerHTML = 'task inserted';
        }else{
            result.innerHTML = 'unable to insert task';
        }
    });
    setTimeout(function(){
        getTask();
    },2000);
}

function getTask(){
    console.log('fetching all the tasks');
    fetch('getAllTask').
    then(res=>res.json()).
    then((data)=>{
        console.log(data);
        var str = "<table border='1' cellspacing='0' cellpadding='10'><tr><th>Task</th><th>Completed</th></tr>";
        for(i=0;i<data.length;i++){
            str+="<tr><td id='task"+i+"'>"+data[i].task_desc+"</td><td><button type='button' id='"+i+"' onclick='deleteTask(this.id)'>x</button></td></tr>";
        }
        str+="</table><br/><br/>";
        tasks.innerHTML = str;
    });
}

function deleteTask(a){
    console.log(a);
    var taskID = 'task'+a;
    console.log(taskID);
    var taskName = document.getElementById(taskID).innerHTML;
    console.log(taskName);
    var url = 'deleteTask?taskName='+taskName;
    console.log(url);
    fetch(url).then(res=>res.json()).then((data)=>{
        console.log(data);
        if(data.found){
            result.innerHTML = 'task deleted';
        }else{
            result.innerHTML = 'unable to delete task';
        }
    });
    setTimeout(function(){
        getTask();
    },2000);
}

