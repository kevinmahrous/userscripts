// ==UserScript==
// @name         Auto404
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prompt to redirect 404 pages to the latest snapshot on the Wayback Machine.
// @author       Kevin Mahrous
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const url = window.location.href;

  // do not redirect if already on the wayback machine (preventing an unnecessary loop)
  if (url.includes("web.archive.org")) return;

  // wait for the page to fully load
  window.addEventListener("load", () => {

    // extract text from the body and title of the current page
    const bodyText = document.body.innerText.toLowerCase();
    const titleText = document.title.toLowerCase();

    // list of keywords that suggest a 404 or a missing page
    const keywords = [
      "404 not found",
      "page not found",
      "not found",
      "error 404",
      "we can’t find",
      "this page isn’t available",
      "doesn’t exist",
      "cannot be found",
      "server not found",
      "gone",
      "no longer available",
      "oops! looks like",
      "unavailable",
      "the requested url was not found"
    ];

    // check if any of the keywords list matches the current page content
    const is404 = keywords.some(keyword =>
      bodyText.includes(keyword) || titleText.includes(keyword)
    );

    // if a 404 is detected, prompt the user before redirecting
    if (is404) {
      const confirmRedirect = confirm(
        "This page appears to be a 404 or missing.\nWould you like to open the latest archive snapshot on wayback machine?"
      );
      if (confirmRedirect) {
        const archiveUrl = `https://web.archive.org/web/0/${encodeURIComponent(url)}`;
        window.location.replace(archiveUrl);
      }
    }
  });
})();