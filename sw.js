//const
const appCache = 'restRevCache';

const urlsToCache = [
  './',
  './index.html',
  './restaurant.html',
  './restaurant.html?id=1',
  './restaurant.html?id=2',
  './restaurant.html?id=3',
  './restaurant.html?id=4',
  './restaurant.html?id=5',
  './restaurant.html?id=6',
  './restaurant.html?id=7',
  './restaurant.html?id=8',
  './restaurant.html?id=9',
  './restaurant.html?id=10',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
  './css/styles.css',
  './data/restaurants.json',
  './js/main.js',
  './js/restaurant_info.js',
  './js/dbhelper.js'
];

//Add URLS to cache while installing sw
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(appCache).then(cache => cache.addAll(urlsToCache)))
});

//We fetch and respond with cached content (if exists)
//if cache is not present, we respond with requested url or 404 custom message
//If anything goes wrong we respond with custom message
self.addEventListener('fetch', event => {
  event.respondWith(
    //check cache
    caches.match(event.request)
    .then(
      //return response or fetch when response undefined
      response => response || fetch(event.request)
      .then(
        response => {
          //response with custom message for 404 status
          if (response.status === 404) {
            return new Response('Aaaajajaj');
          }
          //response with fetched stuff
          return response;
        }
      )
      //catch error if fetch fails
      .catch(
        response => new Response('I\'m offline or something...')
      )
    )
  )
});
