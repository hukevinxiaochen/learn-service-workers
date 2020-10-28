/**
 * Service Worker
 *
 * Globals
 * - CACHE_NAME - usually an app name with a version number
 *   important for opening up the cache available to service workers
 * - urlsToCache - usually an array of URIs corresponding to
 *   the requests whose responses the service worker should cache
 */

const CACHE_NAME = "v1";
const urlsToCache = ["/", "/icon.png"];

// handle the install event, which is triggered by registration
self.addEventListener("install", function (event) {
  // Extend the install event until...
  event.waitUntil(
    // Cache is opened
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        // Files are added to cache
        console.log(`Opened cache with name: ${CACHE_NAME}`);
        return cache
          .addAll(urlsToCache)
          .catch((err) => console.log(err.message));
      })
      .catch(function (err) {
        // Confirm whether all the required assets are cached
        console.log(
          `Failed to open cache with name: ${CACHE_NAME}`,
          err.message
        );
      })
  );
});

// intercept network requests
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response !== undefined) {
        console.log(`Using the Cache to serve a response to ${event.request.url}`);
        return response;
      }
      console.log(`Using the Network to serve a response to ${event.request.url}`);
      return fetch(event.request);
    })
  );
});
