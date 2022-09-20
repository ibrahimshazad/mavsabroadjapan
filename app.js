//Code for progressive handling

var deferredPrompt;
//register service worker
//checks if the service workers are supported by the web browser
//sw.js = url for the service worker

/*
 Remember service worker gets installed only once in their life cycle. 
 So, once you load app.js and the service worker is registered, it is going to be
 installed but once you refresh, it is not going to install it the second time. 
 */

if('serviceWorker' in navigator)
{
  navigator.serviceWorker.register('sw.js')
  .then(function() 
          {
            console.log('Service worker registered!');
          })
//If an error happens, this will catch it: 
  .catch(function(err)
          {
            console.log("Service worker registration failed!")
            console.log(err);
          });
}
else
{
  console.log('Service worker not registered');
}

// prompt installation of webapp to user
window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

//export {
//  deferredPrompt
//};
