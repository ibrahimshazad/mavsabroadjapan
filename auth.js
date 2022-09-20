// Code handling for Authorizations in Firebase

//import required variables and functions
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { collection, addDoc, getDocs, doc, getDoc  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// signup
const signupForm = document.querySelector('#signup-form');

if(signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const username = signupForm['signup-username'].value;
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const cpassword = signupForm['signup-cpassword'].value;

    if(password != cpassword)
    {
      return;
    }
    else {
      // sign up the user
      createUserWithEmailAndPassword(auth,email, password).then(cred => {
        const user = cred.user;
        updateProfile(auth.currentUser, {
        displayName: username
       })
        addDoc(collection(db,'users'),{
            Username: username,
            Password: cpassword,
            Email: email
        });
        signupForm.reset();
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
//  sendEmailVerification(auth.currentUser).then(() => {
//
//  });
});}

//logout
const logout = document.getElementById("logout")
 if(logout){
   logout.onclick = (e) => {
  e.preventDefault();
  e.stopPropagation();
  signOut(auth).then(() => {
    console.log('User signed out');
  });
  window.location.href = "index.html";
};}

// Login
const loginForm = document.querySelector('#login-form');

if(loginForm){
loginForm.addEventListener('submit', (e) => {
  // get user info
  e.preventDefault();

  const email = loginForm['login-username'].value;
  const password = loginForm['login-password'].value;

  signInWithEmailAndPassword(auth, email, password).then(cred => {
    loginForm.reset();
    window.location.href = "index.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

//  sendEmailVerification(auth.currentUser).then(() => {
//
//  });
});}
//If admin is logged in, display some elements, else dont.
onAuthStateChanged(auth, (user) => {
  const addForm = document.getElementById("addPhrases");
  const logoutSymbol = document.getElementById("logout");
  const saveSymbol = document.getElementById("saveNotice");
  const box = document.getElementById("box");
  const noticeBoardContenti = document.getElementsByClassName("noticeBoardContent")[0];
  const save1Symbol = document.getElementsByClassName("saveButton")[0];
  const nameJob = document.getElementsByClassName("name-job")[0];
  const signUpSymbol = document.getElementsByClassName("sign")[0];
  const loginSymbol = document.getElementsByClassName("log")[0];
  const profileName = document.getElementsByClassName("profile_name")[0];
  const addschdule = document.getElementById("addForm");
  const addbutton = document.getElementById("changeFormButton");

  if(user){
    console.log('user logged in: ', user);
    if(addForm) { addForm.style.display = "block";}
    if(logoutSymbol) {logoutSymbol.style.display = "block";}
    if(nameJob) {nameJob.style.display = "block";}
    if(signUpSymbol) {signUpSymbol.style.display = "block";}
    if(saveSymbol) {saveSymbol.style.display = "block";}
    if(save1Symbol) {save1Symbol.style.display = "block";}
    if(addschdule) {addschdule.style.display = "block";}
    if(addbutton) {addbutton.style.display = "block";}
    if(box) {box.setAttribute('contenteditable', true);}
    if(noticeBoardContenti) {noticeBoardContenti.readonly = false;}
    if(loginSymbol) {loginSymbol.style.display = "none";}
    if(profileName) {profileName.textContent = user.displayName;}
  }
  else{
    console.log('user logged out');
    if(addForm) {addForm.style.display = "none";}
    if(logoutSymbol) {logoutSymbol.style.display = "none";}
    if(nameJob) {nameJob.style.display = "none";}
    if(signUpSymbol) {signUpSymbol.style.display = "none";}
    if(saveSymbol) {saveSymbol.style.display = "none";}
    if(addschdule) {addschdule.style.display = "none";}
    if(addbutton) {addbutton.style.display = "none";}
    if(box) {box.setAttribute('contenteditable', false);}
    if(noticeBoardContenti) {noticeBoardContenti.setAttribute('readonly', true);}
    if(save1Symbol) {save1Symbol.style.display = "none";}
    if(loginSymbol) {loginSymbol.style.display = "block";}
    }

});
