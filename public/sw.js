if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>a(e,t),o={module:{uri:t},exports:i,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Arrow.svg",revision:"0c4038ed2f71b486481b6c799ec439ed"},{url:"/IRANSansWeb.woff2",revision:"9d38733b8a7b9153f2bf9bfe476ef8e3"},{url:"/_next/static/chunks/243-2d19f013f501f8b9.js",revision:"2d19f013f501f8b9"},{url:"/_next/static/chunks/312-c087ca627035fd58.js",revision:"c087ca627035fd58"},{url:"/_next/static/chunks/403-179209977fc98a23.js",revision:"179209977fc98a23"},{url:"/_next/static/chunks/50-35925eaa58cb106e.js",revision:"35925eaa58cb106e"},{url:"/_next/static/chunks/576-fe477d8765f5461a.js",revision:"fe477d8765f5461a"},{url:"/_next/static/chunks/67-a84eea688f3072e2.js",revision:"a84eea688f3072e2"},{url:"/_next/static/chunks/718-d6bdc5af21be1791.js",revision:"d6bdc5af21be1791"},{url:"/_next/static/chunks/72-78efe48648c9188d.js",revision:"78efe48648c9188d"},{url:"/_next/static/chunks/75fc9c18-5e77fd7fffcc90d0.js",revision:"5e77fd7fffcc90d0"},{url:"/_next/static/chunks/935-1b070a042d47a2a3.js",revision:"1b070a042d47a2a3"},{url:"/_next/static/chunks/943-94ebfc97662f978e.js",revision:"94ebfc97662f978e"},{url:"/_next/static/chunks/framework-3b5a00d5d7e8d93b.js",revision:"3b5a00d5d7e8d93b"},{url:"/_next/static/chunks/main-3ee20c5d1a3475fd.js",revision:"3ee20c5d1a3475fd"},{url:"/_next/static/chunks/pages/_ShowTicketDetail-abfb763c07cb440b.js",revision:"abfb763c07cb440b"},{url:"/_next/static/chunks/pages/_app-b8b416f16706947e.js",revision:"b8b416f16706947e"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/dashboard-6bdfac006b6280de.js",revision:"6bdfac006b6280de"},{url:"/_next/static/chunks/pages/home-53db5e67b5099434.js",revision:"53db5e67b5099434"},{url:"/_next/static/chunks/pages/index-205ca710e94571b1.js",revision:"205ca710e94571b1"},{url:"/_next/static/chunks/pages/log-bdbd5a6f240d3be1.js",revision:"bdbd5a6f240d3be1"},{url:"/_next/static/chunks/pages/login-8b5cc4e3174012c7.js",revision:"8b5cc4e3174012c7"},{url:"/_next/static/chunks/pages/nodes-5d5582338b654f4a.js",revision:"5d5582338b654f4a"},{url:"/_next/static/chunks/pages/search-47cbe60e6ae0b7fe.js",revision:"47cbe60e6ae0b7fe"},{url:"/_next/static/chunks/pages/showTicket-7b0d16127160a8e4.js",revision:"7b0d16127160a8e4"},{url:"/_next/static/chunks/pages/users-1643a04b508a5227.js",revision:"1643a04b508a5227"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-36d12a75f0098f30.js",revision:"36d12a75f0098f30"},{url:"/_next/static/css/0b58d191da132efb.css",revision:"0b58d191da132efb"},{url:"/_next/static/css/35adb85540c52da6.css",revision:"35adb85540c52da6"},{url:"/_next/static/css/44140af2c6966e44.css",revision:"44140af2c6966e44"},{url:"/_next/static/css/65488f0e12978845.css",revision:"65488f0e12978845"},{url:"/_next/static/css/77ba43d228b88d26.css",revision:"77ba43d228b88d26"},{url:"/_next/static/css/846844b35706686e.css",revision:"846844b35706686e"},{url:"/_next/static/css/d2dc30edcbad2e1a.css",revision:"d2dc30edcbad2e1a"},{url:"/_next/static/css/ea6f3c04bb82a64b.css",revision:"ea6f3c04bb82a64b"},{url:"/_next/static/x0gfFyU13ltTlAnrcm81b/_buildManifest.js",revision:"4dd0867c2bbd22a7756823f36f925d94"},{url:"/_next/static/x0gfFyU13ltTlAnrcm81b/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/british.png",revision:"d81abe741c5feab9ab6fe983a46c2260"},{url:"/favicon.ico",revision:"9c480363d1818920ef000f14d8233e36"},{url:"/icon.png",revision:"432772102d68ebee745da8e5fe4cc0ac"},{url:"/iran.png",revision:"ccb2f777590c1b370aaee0b5b49c28c2"},{url:"/manifest.json",revision:"2eb0b8b998457f1702aa3ddc6682abaa"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
