// import { deferredPrompt } from './app.js';
var TripGuideButton = document.getElementById('trip');
// var phraseButton = document.getElementsByClassName("phr")[0];
//
// phraseButton.addEventListener("touchstart", function(){
//   phraseButton.classList.add("HoverButton");
// });
// phraseButton.addEventListener("touchend", function(){
//   phraseButton.classList.remove("HoverButton");
// });

function openTripGuide() {
  if(deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){
      console.log(choiceResult.outcome);

      if(choiceResult.outcome === 'dismissed'){
        console.log('User cancelled installation');
      }
      else {
        console.log('User added to home screen');
      }
    });
    deferredPrompt = null;
  }
}

//whenever user clicks trip guide, prompt them to install the webapp.
if(TripGuideButton){
  TripGuideButton.addEventListener('click', openTripGuide);
}
