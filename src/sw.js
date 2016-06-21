const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/dist/',
  '/dist/vendor.js'
];

function filter(request, regExp) {
  return regExp.test(request.url);
}

function requestBackend(event) {  // 请求备份操作
  var url = event.request.clone();
  return fetch(url).then(function (res) { // 请求线上资源
    if (!res || res.status !== 200 || res.type !== 'basic') {
      return res;
    }
    var response = res.clone();

    caches.open(CACHE_NAME).then(function (cache) { // 缓存从线上获取的资源
      //判断资源是否允许缓存
      cache.match(event.request).then(function (item) {
        if (item || filter(event.request, /\.(ttf|woff2|woff|eot|jpe?g|png|gif|svg|mp3)\S{0,}$/)) {
          cache.put(event.request, response);
        }
      }).catch(function (ex) {
        console.log(ex);
      });
    });
    return res;
  })
}

self.addEventListener('install', function (event) {
  //安装完成后触发activate事件
  event.waitUntil(Promise.resolve());
});

self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).then(function (response) {
    if (response) {
      return response;
    } else {
      return requestBackend(event);
    }
  }))
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          //删除原缓存
          if (cacheName === 'my-site-cache-v1') {
            return caches.delete(cacheName);
          }
        })
      ).then(function () {
        caches.open(CACHE_NAME)
          .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      })
    })
  );
});