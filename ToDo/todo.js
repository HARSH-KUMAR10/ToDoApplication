const tasks = document.getElementById('tasks');
const newtask = document.getElementById('newtask');
const result = document.getElementById('result');

function newTaskAdd(){
    var task = newtask.value;
    newtask.innerHTML="";
    var url = '/newTaskAdd?newTask='+task;
    fetch(url).then(response => response.json()).then(data => {
        if(data){
            result.innerHTML = 'task inserted';
        }else{
            result.innerHTML = 'unable to insert task';
        }
    });
    
}

function getTask(){
    fetch('/getAllTask').then(res=>res.json()).then((data)=>{
        var str = "<table><tr><th>Task</th></tr>";
        for(i=0;i<data.length;i++){
            str+="<tr><td>"+data.task_desc+"</td></tr>";
        }
        str+="</table>";
        tasks.innerHTML = str;
    });
}