//IMPORT required functions from firebase and firebase variables from other files.
import { db, auth } from './firebase.js';
import { collection, addDoc, deleteDoc, getDocs, doc, getDoc, orderBy, onSnapshot, where, query, updateDoc, deleteField  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import {  onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";

// const signUser = auth.currentUser;
const phrasesList = document.querySelector('#swiper-wrapper');
const form = document.querySelector('#addPhrases');

//for each document in database, render these in html
function renderPhrases(doct){
  let slideDiv = document.createElement("div");
  let card = document.createElement("div");
  let layer = document.createElement("div");
  let content = document.createElement("div");
  let p1  = document.createElement("p");
  let p2  = document.createElement("p");
  let p3  = document.createElement("p");
  let br1 = document.createElement("br");
  let br2  = document.createElement("br");
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
  p1.textContent = doct.data().English;
  content.appendChild(br1);
  content.appendChild(p2);
  p2.textContent = doct.data().Japanese;
  content.appendChild(br2);
  content.appendChild(p3);
  p3.textContent = doct.data().JapText;

  phrasesList.appendChild(slideDiv);

  // deleting data
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    phrasesList.removeChild(phrasesList.querySelector('[data-id=' + id + ']'));
    deleteDoc(doc(collection(db,"phrases"), id));
  });

//if user is admin, display cross for deleting functionality.
  onAuthStateChanged(auth, (user) => {
    if(user){
      cross.style.display = 'block';
    }
    else{
      cross.style.display = 'none';
      }

  });
}

// getDocs(collection(db,"phrases")).then(snapshot => {
//   snapshot.docs.forEach(doc => {
// //  console.log(doc.data());
//    renderPhrases(doc);
//  });
// });

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    addDoc(collection(db,'phrases'),{
        English: form.English.value,
        Japanese: form.Japanese.value,
        JapText: form.JapText.value
    });
    form.English.value = '';
    form.Japanese.value = '';
    form.JapText.value = '';
});

// const userCollectionRef = collection(db, "phrases");
// const getPhrases = async() => {
// const data = await getDocs(userCollectionRef);
//
// const setPhrases = a => { data.docs.map((doc) => ({ ...doc.data(), id: doc.id}));};
// setPhrases();
// console.log(data.English);
//
// };
// getPhrases();

// real-time listener
const phrasesRef = collection(db, "phrases");
const q = query(phrasesRef, orderBy("English"));

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
