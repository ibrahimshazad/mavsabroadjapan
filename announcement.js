import { db, auth } from './firebase.js';
import { collection, addDoc, deleteDoc, getDocs, doc, getDoc, orderBy, onSnapshot, where, query, updateDoc, deleteField  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

// const signUser = auth.currentUser;
const phrasesList = document.querySelector('#swiper-wrapper');
const form = document.getElementById('saveNotice');
const text = document.getElementById('noticeBoardContent');

// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

var datetime = "Posted: " + new Date().today() + " @ " + new Date().timeNow();

//for each document in database, render these in html

function renderPhrases(doct){
  let slideDiv = document.createElement("div");
  let card = document.createElement("div");
  let layer = document.createElement("div");
  let content = document.createElement("div");
  let p1  = document.createElement("p");
  let p2  = document.createElement("p");
  let img = document.createElement("img");
  let cross = document.createElement('div');

  slideDiv.setAttribute("class", "swiper-slide");
  card.setAttribute("class", "card");
  layer.setAttribute("class", "layer");
  content.setAttribute("class", "content");
  img.setAttribute("class", "quote");
  img.setAttribute("src", "src/images/quote.png");
  card.setAttribute("data-id", doct.id);
  cross.setAttribute("class", "cross-admin");
  slideDiv.setAttribute("data-id", doct.id);
  cross.textContent = 'x';
  cross.style.fontSize = "20px";
  cross.style.color = "white";

  slideDiv.appendChild(card);
  card.appendChild(img);
  card.appendChild(cross);
  card.appendChild(layer);
  card.appendChild(content);
  content.appendChild(p1);
  content.appendChild(p2);
  p1.textContent = doct.data().message;
  p2.textContent = doct.data().Date;
  phrasesList.appendChild(slideDiv);

  // deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    phrasesList.removeChild(phrasesList.querySelector('[data-id=' + id + ']'));
    deleteDoc(doc(collection(db,"notice"), id));
  });

//if admin is logged in, display cross.
  onAuthStateChanged(auth, (user) => {
    if(user){
      cross.style.display = 'block';
    }
    else{
      cross.style.display = 'none';
      }

  });
}

// saving data
if(form){
form.addEventListener('click', (e) => {
    addDoc(collection(db,'notice'),{
        message: text.value,
        Date: datetime
    });
});}

// real-time listener
const phrasesRef = collection(db, "notice");
const q = query(phrasesRef, orderBy("message"));

onSnapshot(q, (snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderPhrases(change.doc);
        } else if (change.type == 'removed'){

        }
    });
});
