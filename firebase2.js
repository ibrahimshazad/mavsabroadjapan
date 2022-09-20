// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "INSERT HERE",
  authDomain: "INSERT HERE",
  projectId: "INSERT HERE",
  storageBucket: "INSERT HERE",
  messagingSenderId: "INSERT HERE",
  appId: "INSERT HERE",
  measurementId: "INSERT HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
//importing necessary firebase functions
import {getDatabase, ref, set, child, update, remove, get}  from "https://www.gstatic.com/firebasejs/9.3.0/firebase-database.js";

const database = getDatabase();


/*FUNCTIONS FOR IMPORTANT CONTACTS PAGE*/


//This function saves the content from text field in Important Contacts Page into the firebase database.
function save()
{
var editContent = document.getElementById('box').innerHTML;
update(ref(database,'importantContacts'),{
  info: editContent
});
}

var check =  document.getElementById('save1');
if(check)
{
//When the "Save Changes" button is clicked, it calls the save function.
check.addEventListener
('click', e =>
{
 save();
}
)
}

function updateContent()
{
//ref represents a specific location in the database that can be used for reading
//or writing data to that database location
const dbref = ref(database);
//This extracts data from the section "importantContacts" and if the
//database exists, the text field will be set to that data.
get(child(dbref,"importantContacts")).then((snapshot)=>{
  if(snapshot.exists())
  {
      document.getElementById("box").innerHTML = snapshot.val().info;
  }
})
}
//Function within modules won't be available to access globally.
//So, it needs to be attached to window.
window.updateContent = updateContent



//NOTICE BOARD


//This function saves the content from text field in Important Contacts Page into the firebase database.
function saveNotice()
{
var editContent = document.getElementById('noticeBoardContent').value;
console.log(editContent);
update(ref(database,'noticeBoard'),{
  info: editContent
});
alert("Changes");
}


var check2 =  document.getElementById('saveNotice');
if(check2)
{
//When the "Save Changes" button is clicked, it calls the save function.
check2.addEventListener('click', e => {
  saveNotice();
  })
}

var noticeBoardDatabase;

function updateNoticeBoardContent()
{
//ref represents a specific location in the database that can be used for reading
//or writing data to that database location
const dbref = ref(database);
//This extracts data from the section "importantContacts" and if the
//database exists, the text field will be set to that data.
get(child(dbref,"noticeBoard")).then((snapshot)=>{
  if(snapshot.exists())
  {
      noticeBoardDatabase =  snapshot.val().info;
      document.getElementById("noticeBoardContent").innerHTML = noticeBoardDatabase;
  }
})
}

//Function within modules won't be available to access globally.
//So, it needs to be attached to window.
window.updateNoticeBoardContent = updateNoticeBoardContent


//export variables to other js files
export
{
database
};
