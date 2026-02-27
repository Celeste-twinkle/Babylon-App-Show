// const version = "0.18.2";
// const PRE_CACHE = []; // 预缓存关键资源


// const verifyCacheFreshness = (request, cachedResponse) => {
//     // 构造HEAD请求（复用原请求头）
//     const headRequest = new Request(request, { method: 'HEAD' });

//     return fetch(headRequest, { headers: request.headers })
//         .then(networkResponse => {
//             // 优先使用ETag比对
//             const cachedETag = cachedResponse.headers.get('ETag');
//             const networkETag = networkResponse.headers.get('ETag');
//             if (cachedETag && networkETag) {
//                 return cachedETag === networkETag;
//             }

//             // 次选Last-Modified比对
//             const cachedModified = cachedResponse.headers.get('Last-Modified');
//             const networkModified = networkResponse.headers.get('Last-Modified');
//             if (cachedModified && networkModified) {
//                 return cachedModified === networkModified;
//             }

//             return false; // 无验证头时默认需要更新
//         })
//         .catch(() => true); // 网络错误视为需要更新
// };

// const fetchAndCache = (request, cache) => {
//     return fetch(request.clone())
//         .then(networkResponse => {
//             // 仅缓存有效响应（200范围状态码）
//             if (networkResponse.ok) {
//                 cache.put(request, networkResponse.clone());
//             }
//             return networkResponse;
//         })
//         .catch(() => caches.match(request)); // 网络失败时回退缓存
// };

// self.addEventListener('install', event => {
//     event.waitUntil(
//         caches.open(version)
//             .then(cache => cache.addAll(PRE_CACHE)) // 预填充缓存[4](@ref)
//     );
// });

// self.addEventListener('activate', event => {
//     self.addEventListener('activate', event => {
//         event.waitUntil(
//             caches.keys().then(cacheNames =>
//                 Promise.all(cacheNames.map(cacheName =>
//                     version !== cacheName
//                         ? caches.delete(cacheName)
//                         : Promise.resolve() // 确保始终返回 Promise
//                 ))
//             ).then(() => self.clients.claim())
//         );
//     });
// });

// self.addEventListener('fetch', event => {
//     const { request } = event;

//     // 过滤非目标请求（静态资源、HTTP协议等）
//     if (request.method !== 'GET' ||
//         /\/(node_modules|\.vite)\//.test(request.url) ||
//         !request.url.startsWith('http')) {
//         return;
//     }

//     event.respondWith(
//         caches.open(version).then(cache =>
//             cache.match(request).then(cachedResponse => {
//                 // 无缓存时直接网络请求
//                 if (!cachedResponse) {
//                     return fetchAndCache(request, cache);
//                 }

//                 // 有缓存时发起HEAD验证
//                 return verifyCacheFreshness(request, cachedResponse)
//                     .then(isFresh => {
//                         if (isFresh) {
//                             return cachedResponse; // 直接返回缓存
//                         } else {
//                             return fetchAndCache(request, cache); // 更新缓存
//                         }
//                     })
//                     .catch(() => cachedResponse); // 验证失败降级返回缓存
//             })
//         )
//     );
// });
