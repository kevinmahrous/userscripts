// ==UserScript==
// @name         Auto404
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prompt to redirect 404 pages to the latest snapshot on the Wayback Machine.
// @author       Kevin Mahrous
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function(){"use strict";const url=window.location.href;if(url.includes("web.archive.org"))return;window.addEventListener("load",()=>{const bodyText=document.body.innerText.toLowerCase();const titleText=document.title.toLowerCase();const keywords=["404 not found","page not found","not found","error 404","we can’t find","this page isn’t available","doesn’t exist","cannot be found","server not found","gone","no longer available","oops! looks like","unavailable","the requested url was not found"];const is404=keywords.some(keyword=>bodyText.includes(keyword)||titleText.includes(keyword));if(is404){const confirmRedirect=confirm("This page appears to be a 404 or missing.\nWould you like to open the latest archive snapshot on wayback machine?");if(confirmRedirect){const archiveUrl=`https://web.archive.org/web/0/${encodeURIComponent(url)}`;window.location.replace(archiveUrl)}}})})()