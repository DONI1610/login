/* script.js - Firebase Auth (login & register) */
const firebaseConfig = {"apiKey": "AIzaSyD-OBTslLFf1Y6Myn42lQP81KdE0zN5m90", "authDomain": "doni-815d9.firebaseapp.com", "projectId": "doni-815d9", "storageBucket": "doni-815d9.firebasestorage.app", "messagingSenderId": "172348872329", "appId": "1:172348872329:web:4f36821f5935e3047e1858", "measurementId": "G-TL4NZQL865"};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function register(){
  var email=document.getElementById('regEmail').value.trim();
  var pass=document.getElementById('regPass').value;
  var msg=document.getElementById('regMsg'); msg.textContent='';
  if(!email||!pass){msg.textContent='Điền email và mật khẩu.';return;}
  if(pass.length<6){msg.textContent='Mật khẩu phải có ít nhất 6 ký tự.';return;}
  auth.createUserWithEmailAndPassword(email,pass).then(function(){msg.textContent='Đăng ký thành công! Chuyển tới đăng nhập...';setTimeout(function(){window.location.href='index.html'},900)}).catch(function(e){msg.textContent=e.message});
}

function login(){
  var email=document.getElementById('loginEmail').value.trim();
  var pass=document.getElementById('loginPass').value;
  var msg=document.getElementById('loginMsg'); msg.textContent='';
  if(!email||!pass){msg.textContent='Điền email và mật khẩu.';return;}
  auth.signInWithEmailAndPassword(email,pass).then(function(){window.location.href='https://doni1610.github.io/doni/home'}).catch(function(e){msg.textContent='Đăng nhập thất bại: '+e.message});
}
