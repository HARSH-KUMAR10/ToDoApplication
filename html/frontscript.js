const statTwo = document.getElementById('statTwoCount');
const statThree = document.getElementById('statThreeCount');
var overAllUses=0;
var totalTask = 0;
function initialize(){
    B();
    setTimeout(function(){
        A();
    },1000);
}
function B(){
    fetch('getTotalUsers').then(res=>res.json()).then((data)=>{
        overAllUses = Number(data.count);
    });
    fetch('getTotalTasks').then(res=>res.json()).then((data)=>{
        totalTask = Number(data.count);
    })
}
function A(){
    console.log(overAllUses,totalTask);
    var a = 0;
    var b = 0;
    var c = 0;
    var x = setInterval(()=>{
        var q = false,w=false,e=false;
        if(b<=overAllUses){
            statTwo.innerHTML = b;
            w=true;
        }
        if(c<=totalTask){
            statThree.innerHTML = c;
            e=true;
        }
        a++;
        b++;
        c++;
        if(!q && !w && !e){
            clearInterval(x);
        }
    },100);
}