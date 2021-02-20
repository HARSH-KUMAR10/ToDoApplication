const email = document.getElementById('email');
const pass = document.getElementById('pass');
const repass = document.getElementById('repass');

function validate(){
var passVal = pass.value;
var repassVal = repass.value;
alert('checking values');
if(passVal.length<8){
    alert('password length should be more than 8')
    return false;
}

if(passVal == repassVal){
    return true;
}
alert('password incorect format');
return false;
}