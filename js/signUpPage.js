import User from './models/User.js';

const user = new User;


const getUserInfo = () => {
    let arrInfo = document.querySelectorAll('#signup-form input, #signup-form select');
    arrInfo.forEach((item, key) => {
        user[item.id] = item.value;
    })
}
const formatData = ()=>{
    let {gender} = user;    
    user.gender = gender=='1'?true:false;
}
const signUpHandle = async() => {
    getUserInfo();
    formatData();
    
    axios.post("https://shop.cyberlearn.vn/api/Users/signup", {...user}).then(response=>{
        console.log(response.data.message);
        
    }).catch(error=>{
        console.log(error.response.data.code);
        
        
    })      



}

const signUpBtn = document.getElementById('signUpBtn');
signUpBtn.onclick= signUpHandle;