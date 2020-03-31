//set initail cache
var cachestatic = 'v1';

// add event listener for install event and create cache with all objects
self.addEventListener('install', function(event) {
  event.waitUntil(caches.open(cachestatic).then(function(cache){
    return cache.addAll([	'/',
    	'/css/styles.css',
    	'/data/restaurants.json',
    	'/img/1.jpg',
    	'/img/2.jpg',
    	'/img/3.jpg',
    	'/img/4.jpg',
    	'/img/5.jpg',
    	'/img/6.jpg',
    	'/img/7.jpg',
    	'/img/8.jpg',
    	'/img/9.jpg',
    	'/img/10.jpg',
    	'/js/dbhelper.js',
    	'/js/main.js',
    	'/js/restaurant_info.js',
    	'/index.html',
    	'/restaurant.html'
    ])
})
)}
);


//add a sw for event listener to activate a new sw when a new one exists
self.addEventListener('activate', function(event) {
	event.waitUntil(caches.keys().then(function(cacheName){
    return Promise.all(
      cacheName.filter(function(cacheName){
      return cacheName.startswith('v') && cacheName != cachestatic;
    }).map(function(cacheName){
      return caches.delete(cacheName);
    }));
  }));
});


//add a sw event that pulls from sw cache but will fetch from the server
self.addEventListener('fetch', function(event) {
event.respondWith(
  caches.match(event.request).then(function(response){
    if(response) return response;
    return fetch(event.request);
  })
  .catch(function(error) {
    console.log("Error", error);
  })
)
});
