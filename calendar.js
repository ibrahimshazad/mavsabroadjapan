/*jshint esversion: 6 */
//import variables from other file.
import { db } from './firebase.js';
//import functions from firebase module
import { collection, addDoc, deleteDoc, getDocs, doc, getDoc, orderBy, onSnapshot, where, query, updateDoc, deleteField, setDoc,  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

//necessary variables and elements from html file in schedule.html
const ScheduleCollectionRef = collection(db, 'schedule');
//general expression of document in firestore.
const regex = new RegExp('4MuDDqamlKl8fVwhMMWn');

var calendar = document.getElementById("calendar-table");
var gridTable = document.getElementById("table-body");
var currentDate = new Date();
var selectedDate = currentDate;
var selectedDayBlock = null;
var globalEventObj = {};

var sidebar = document.getElementById("sidebar");

//creating calendar view
function createCalendar(date, side) {
   var currentDate = date;
   var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

   var monthTitle = document.getElementById("month-name");
   var monthName = currentDate.toLocaleString("en-US", {
      month: "long"
   });
   var yearNum = currentDate.toLocaleString("en-US", {
      year: "numeric"
   });
   monthTitle.innerHTML = `${monthName} ${yearNum}`;

   if (side == "left") {
      gridTable.className = "animated fadeOutRight";
   } else {
      gridTable.className = "animated fadeOutLeft";
   }
//setting date
   setTimeout(() => {
      gridTable.innerHTML = "";

      var newTr = document.createElement("div");
      newTr.className = "row";
      var currentTr = gridTable.appendChild(newTr);

      for (let i = 1; i < startDate.getDay(); i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      lastDay = lastDay.getDate();

      for (let i = 1; i <= lastDay; i++) {
         if (currentTr.children.length >= 7) {
            currentTr = gridTable.appendChild(addNewRow());
         }
         let currentDay = document.createElement("div");
         currentDay.className = "col";
         if (selectedDayBlock == null && i == currentDate.getDate() || selectedDate.toDateString() == new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()) {
            selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

            document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
               month: "long",
               day: "numeric",
               year: "numeric"
            });
            console.log("Date is:"+ selectedDate.toLocaleString);

            selectedDayBlock = currentDay;
            setTimeout(() => {
               currentDay.classList.add("blue");
               currentDay.classList.add("lighten-3");
            }, 900);
         }
         currentDay.innerHTML = i;

         //show marks
         if (globalEventObj[new Date(currentDate.getFullYear(), currentDate.getMonth(), i).toDateString()]) {
            let eventMark = document.createElement("div");
            eventMark.className = "day-mark";
            currentDay.appendChild(eventMark);
         }

         currentTr.appendChild(currentDay);
      }

      for (let i = currentTr.getElementsByTagName("div").length; i < 7; i++) {
         let emptyDivCol = document.createElement("div");
         emptyDivCol.className = "col empty-day";
         currentTr.appendChild(emptyDivCol);
      }

      if (side == "left") {
         gridTable.className = "animated fadeInLeft";
      } else {
         gridTable.className = "animated fadeInRight";
      }

      function addNewRow() {
         let node = document.createElement("div");
         node.className = "row";
         return node;
      }

   }, !side ? 0 : 270);
}

createCalendar(currentDate);

var todayDayName = document.getElementById("todayDayName");
todayDayName.innerHTML = "Today is " + currentDate.toLocaleString("en-US", {
   weekday: "long",
   day: "numeric",
   month: "short"
});

var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");

prevButton.onclick = function changeMonthPrev() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
   createCalendar(currentDate, "left");
};
nextButton.onclick = function changeMonthNext() {
   currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
   createCalendar(currentDate, "right");
};
//add events by admin function.
function addEvent(title, desc)
{

  // globalEventObj[NewDate] = {title:desc};

   var date = selectedDate.toLocaleString();
   var DateArray = date.split(',');
   var NewDate = (DateArray[0].split('/').join('-'));
   const docRef = addDoc(collection(db, "Schedule"),
   {
      Date: NewDate,
      EventTitle: title,
      EventDescription: desc
   });
}
//show events main functionality in sidebar.
 async function showEvents()
{
   var date = selectedDate.toLocaleString();
   var DateArray = date.split(',');
   var NewDate = (DateArray[0].split('/').join('-'));

   let sidebarEvents = document.getElementById("sidebarEvents");
   //let objWithDate = globalEventObj[selectedDate.toDateString()];


   console.log (selectedDate.toLocaleString());


   const querySnapshot =  await getDataFromFirestore(NewDate);
   const  databaseObjects = [];
   console.log(querySnapshot);
   querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let date = doc.data().Date;
      let Event = doc.data().EventDescription;
      let title = doc.data().EventTitle;
      databaseObjects.push({
         date: date,
         event: Event,
         title: title
      });
      //console.log(doc.id, " => ", doc.data().Date,doc.data().EventDescription,doc.data().EventTitle);
   });
   console.log("Database Items "+databaseObjects);
   databaseObjects.forEach(item => console.log(item.date + " " + item.event + " " + item.title));
   if (!globalEventObj[NewDate])
    {
      globalEventObj[NewDate] = {};
   }
   databaseObjects.forEach(item => globalEventObj[item.date][item.title]= item.event);

  // globalEventObj[Date_Today][title] = desc;

   let objWithDate = globalEventObj[NewDate];

   sidebarEvents.innerHTML = "";

   if (objWithDate) {
      let eventsCount = 0;
      for (var key in globalEventObj[NewDate]) {
         let eventContainer = document.createElement("div");
         eventContainer.className = "eventCard";

         let eventHeader = document.createElement("div");
         eventHeader.className = "eventCard-header";

         let eventDescription = document.createElement("div");
         eventDescription.className = "eventCard-description";

         eventHeader.appendChild(document.createTextNode(key));
         eventContainer.appendChild(eventHeader);

         eventDescription.appendChild(document.createTextNode(objWithDate[key]));
         eventContainer.appendChild(eventDescription);

         let markWrapper = document.createElement("div");
         markWrapper.className = "eventCard-mark-wrapper";
         let mark = document.createElement("div");
         mark.classList = "eventCard-mark";
         markWrapper.appendChild(mark);
         eventContainer.appendChild(markWrapper);

         sidebarEvents.appendChild(eventContainer);

         eventsCount++;
      }
      let emptyFormMessage = document.getElementById("emptyFormTitle");
      emptyFormMessage.innerHTML = `${eventsCount} events now`;
   } else {
      let emptyMessage = document.createElement("div");
      emptyMessage.className = "empty-message";
      emptyMessage.innerHTML = "Sorry, no events on selected date";
      sidebarEvents.appendChild(emptyMessage);
      let emptyFormMessage = document.getElementById("emptyFormTitle");
      emptyFormMessage.innerHTML = "No events now";
   }
}
//showing events on the sidebar
gridTable.onclick = function (e) {

   if (!e.target.classList.contains("col") || e.target.classList.contains("empty-day")) {
      return;
   }

   if (selectedDayBlock) {
      if (selectedDayBlock.classList.contains("blue") && selectedDayBlock.classList.contains("lighten-3")) {
         selectedDayBlock.classList.remove("blue");
         selectedDayBlock.classList.remove("lighten-3");
      }
   }
   selectedDayBlock = e.target;
   selectedDayBlock.classList.add("blue");
   selectedDayBlock.classList.add("lighten-3");

   selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(e.target.innerHTML));

   showEvents();

   document.getElementById("eventDayName").innerHTML = selectedDate.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
   });

};
var changeFormButton = document.getElementById("changeFormButton");
var addForm = document.getElementById("addForm");
changeFormButton.onclick = function (e) {
   addForm.style.top = 0;
};
//cancelling labels on the form.
var cancelAdd = document.getElementById("cancelAdd");
cancelAdd.onclick = function (e) {
   addForm.style.top = "100%";
   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }
};
//adding events by admin
var addEventButton = document.getElementById("addEventButton");
addEventButton.onclick = function (e) {
   let title = document.getElementById("eventTitleInput").value.trim();
   let desc = document.getElementById("eventDescInput").value.trim();


   if (!title || !desc) {
      document.getElementById("eventTitleInput").value = "";
      document.getElementById("eventDescInput").value = "";
      let labels = addForm.getElementsByTagName("label");
      for (let i = 0; i < labels.length; i++)
      {
         labels[i].className = "";
      }
     return;
   }

   addEvent(title, desc);
   showEvents();
//show events on selected dates.
   if (!selectedDayBlock.querySelector(".day-mark")) {
      selectedDayBlock.appendChild(document.createElement("div")).className = "day-mark";
   }

   let inputs = addForm.getElementsByTagName("input");
   for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
   }
   let labels = addForm.getElementsByTagName("label");
   for (let i = 0; i < labels.length; i++) {
      labels[i].className = "";
   }

};
//accessing documents from firestore
async function getDataFromFirestore(NewDate)
{
   //const docRef = doc(db, "Schedule");
   const scheduleRef = await collection(db, "Schedule");
   const q = await  query(scheduleRef, where("Date", "==", NewDate));
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   let date = doc.data().Date;
   let Event = doc.data().EventDescription;
   let title = doc.data().EventTitle;
   console.log(doc.id, " => ", doc.data().Date,doc.data().EventDescription,doc.data().EventTitle);
   });
   return querySnapshot;
}
