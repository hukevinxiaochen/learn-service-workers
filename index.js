// Client-side JavaScript can change element colors
const title = document.getElementById("title");
title.style.color = "blue";

// It can also register a service worker.

/**
 * REGISTRATION
 *
 * tests for if navigator even has serviceWorker API
 * if so, adds an event listener onto window's "load" event
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        // Registration successful
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch(function (err) {
        // Registration failed
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}
