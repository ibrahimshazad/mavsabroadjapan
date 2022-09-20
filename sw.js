/*This is for service worker functions . Must be in public directory so that
 it's scope is all over the files
if any changes are made to sw.js file, it needs to be reloaded
or else you will have two sw's running in "Application" tab
if you want to see your sw running and activated and updated, click
 skipWaiting in "Service Workers"*/

//This will fire off whenever service worker is being installed.
self.addEventListener('install', function(event)
{
  console.log('[Service Worker] Installing Service Worker... ', event);

});


self.addEventListener("install", e => {

    //this function will take in a promise
    e.waitUntil(
        //we will open a cache called static. If this cache doesn't exist,
        //it will be created which will then contain cached static resources.
        caches.open("static").then(cache=>{
            // "./" is the index.html file.
            return cache.addAll(["./", "./src/css/style.css","./index.html", "./src/images/logoCropped-removebg.png","./src/images/logoCropped.png","./importantContacts.html"
            ,"./src/js/firebase2.js","./src/js/app.js","./src/images/icons/pin.png","./manifest.json","./tripGuide.html","./src/js/tripGuide.js","./src/images/icons/noticeBoard.png","./src/css/homepage.css"
          ,"./src/images/mountainandtemple.jpg","./src/js/firebase.js"
          ]);
        })
        //Now, the service worker won't be considered installed until those promises
        //up there are settled. So, once everything is cached, sw will be installed.
    );
});


self.addEventListener('activate', function(event)
{
  console.log('[Service Worker] Activating Service Worker ... ', event);
});


//This will run when there's a fetch request.
self.addEventListener("fetch", e => {
    //Event object cotains a request. So, we are simply printing out the URL of that request
    console.log("Intercepting fetch request for: ${e.request.url}")
});

CACHE_NAME = "static";
self.addEventListener('fetch', event =>
{
  event.respondWith
  (
    caches.open(CACHE_NAME).then
    ( cache =>
      {
        return cache.match(event.request).then(response => {
        return response || fetch(event.request)
        .then(response => {
        const responseCl = response.clone();
        cache.put(event.request, responseCl);
          })
        })
      }
   )
  )
});
