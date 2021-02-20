const statOne = document.getElementById('statOneCount');
const statTwo = document.getElementById('statTwoCount');
const statThree = document.getElementById('statThreeCount');
function initialize(){
    A();
}
function A(){

    let registeredUsers = 10;
    let overAllUses = 15;
    let todayUses=5;
    var a = 0;
    var b = 0;
    var c = 0;
    var x = setInterval(()=>{
        var q = false,w=false,e=false;
        if(a<=registeredUsers){
            statOne.innerHTML = a;
            q=true;
        }
        if(b<=overAllUses){
            statTwo.innerHTML = b;
            w=true;
        }
        if(c<=todayUses){
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