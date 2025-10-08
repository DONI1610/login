/* home.js - Firestore notes + auth guard */
const firebaseConfig = {"apiKey": "AIzaSyD-OBTslLFf1Y6Myn42lQP81KdE0zN5m90", "authDomain": "doni-815d9.firebaseapp.com", "projectId": "doni-815d9", "storageBucket": "doni-815d9.firebasestorage.app", "messagingSenderId": "172348872329", "appId": "1:172348872329:web:4f36821f5935e3047e1858", "measurementId": "G-TL4NZQL865"};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(function(user){
  if(!user){window.location.href='index.html';return;} 
  document.getElementById('welcome').textContent = 'Xin chào — ' + (user.email||user.displayName||'Bạn');
  loadNotes();
});

document.getElementById('sendBtn').addEventListener('click',function(){
  var text=document.getElementById('noteText').value.trim(); if(!text) return alert('Viết gì đó đi bạn 😊');
  var user=auth.currentUser;
  db.collection('notes').add({text:text,author:user?user.email:'Ẩn danh',createdAt:firebase.firestore.FieldValue.serverTimestamp()}).then(function(){document.getElementById('noteText').value='';loadNotes();});
});

async function loadNotes(){
  var notesEl=document.getElementById('notes'); notesEl.innerHTML='';
  var snapshot = await db.collection('notes').orderBy('createdAt','desc').limit(50).get();
  snapshot.forEach(function(doc){
    var data=doc.data();
    var el=document.createElement('div'); el.className='note';
    var meta=document.createElement('div'); meta.className='meta';
    var time=''; if(data.createdAt && data.createdAt.toDate) time = data.createdAt.toDate().toLocaleString();
    meta.textContent = (data.author||'Ẩn danh') + ' — ' + time;
    var content=document.createElement('div'); content.textContent = data.text; content.style.marginTop='6px';
    el.appendChild(meta); el.appendChild(content); notesEl.appendChild(el);
  });
}

document.getElementById('logout').addEventListener('click',function(){auth.signOut().then(function(){window.location.href='index.html'});});
