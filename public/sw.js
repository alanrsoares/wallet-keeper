if(!self.define){let e,_={};const n=(n,i)=>(n=new URL(n+".js",i).href,_[n]||new Promise((_=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=_,document.head.appendChild(e)}else e=n,importScripts(n),_()})).then((()=>{let e=_[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,s)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(_[a])return;let r={};const o=e=>n(e,a),d={module:{uri:a},exports:r,require:o};_[a]=Promise.all(i.map((e=>d[e]||o(e)))).then((e=>(s(...e),r)))}}define(["./workbox-7028bf80"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/CH0_w7FCBoq_7fiqHJMXM/_buildManifest.js",revision:"4ecf33751758756cff42325b3da2b7f8"},{url:"/_next/static/CH0_w7FCBoq_7fiqHJMXM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/833-d824b4e66f635678.js",revision:"d824b4e66f635678"},{url:"/_next/static/chunks/framework-8d78bf989db74c8f.js",revision:"8d78bf989db74c8f"},{url:"/_next/static/chunks/main-2459217d052c4c07.js",revision:"2459217d052c4c07"},{url:"/_next/static/chunks/pages/_app-517ef0c146e66397.js",revision:"517ef0c146e66397"},{url:"/_next/static/chunks/pages/_error-b5563822c4fc4eaa.js",revision:"b5563822c4fc4eaa"},{url:"/_next/static/chunks/pages/index-97f64524778e7680.js",revision:"97f64524778e7680"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-dcf4136cb4ed4a3e.js",revision:"dcf4136cb4ed4a3e"},{url:"/_next/static/css/b52c91e604d4bc77.css",revision:"b52c91e604d4bc77"},{url:"/favicon.png",revision:"2dff9656f6a26a3a1ea87414ca8d88e1"},{url:"/favicon.svg",revision:"c3fdd0a46796adf103fe71347d83857e"},{url:"/icon-192x192.png",revision:"24d68d404762fae0aa3c2ac19cf6f6e5"},{url:"/icon-192x192.png:Zone.Identifier",revision:"1cc78e555e3ce249151a5db1a734b268"},{url:"/icon-256x256.png",revision:"f049bd5a47b4e49868a00b47c00d8406"},{url:"/icon-256x256.png:Zone.Identifier",revision:"1cc78e555e3ce249151a5db1a734b268"},{url:"/icon-384x384.png",revision:"a84eb8d1bd52d0f1bbf4b0116d86232a"},{url:"/icon-384x384.png:Zone.Identifier",revision:"1cc78e555e3ce249151a5db1a734b268"},{url:"/icon-512x512.png",revision:"86021ed330d77632304901042961901e"},{url:"/icon-512x512.png:Zone.Identifier",revision:"1cc78e555e3ce249151a5db1a734b268"},{url:"/logo-512.png",revision:"31221892bee8f90dd11e6d2e66ed25ed"},{url:"/logo-512.png:Zone.Identifier",revision:"dce5191790621b5e424478ca69c47f55"},{url:"/manifest.json",revision:"4a16c884a8a5171e150af68109e46162"},{url:"/manifest.webmanifest",revision:"298b5a4bba0851355e65e99cfc20fe34"},{url:"/manifest.webmanifest:Zone.Identifier",revision:"1cc78e555e3ce249151a5db1a734b268"},{url:"/splash_screens/10.2__iPad_landscape.png",revision:"5e28a6320805bc2893c73e88cfac2c8f"},{url:"/splash_screens/10.2__iPad_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/10.2__iPad_portrait.png",revision:"f6f56550f81f5710d62ca3618c5c9908"},{url:"/splash_screens/10.2__iPad_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/10.5__iPad_Air_landscape.png",revision:"63fee3202d322710859ec457655dfd96"},{url:"/splash_screens/10.5__iPad_Air_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/10.5__iPad_Air_portrait.png",revision:"58c30b072dfa157f384bd5a287fe95dc"},{url:"/splash_screens/10.5__iPad_Air_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/10.9__iPad_Air_landscape.png",revision:"2c9c443a24333e97a067145b5012ccd2"},{url:"/splash_screens/10.9__iPad_Air_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/10.9__iPad_Air_portrait.png",revision:"8e53cf7cd8311459e675bbc24009c281"},{url:"/splash_screens/10.9__iPad_Air_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",revision:"c51db35b5fd5b87710fea802b7a73d63"},{url:"/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",revision:"a2d6f294fa6218cd0cc3ea8ad6c6d24d"},{url:"/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/12.9__iPad_Pro_landscape.png",revision:"7c20c1ca0542486e1bb1d69237ae5a80"},{url:"/splash_screens/12.9__iPad_Pro_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/12.9__iPad_Pro_portrait.png",revision:"0890ee00acb921eef11278306cb1b7c2"},{url:"/splash_screens/12.9__iPad_Pro_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",revision:"0989d5a9beaf67d3199125324555ef7d"},{url:"/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",revision:"ca993d4f9031c1c49a830e9b39e75a55"},{url:"/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/8.3__iPad_Mini_landscape.png",revision:"a238f778f9aa435c473c6a903d7fd68b"},{url:"/splash_screens/8.3__iPad_Mini_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/8.3__iPad_Mini_portrait.png",revision:"5e2bf0fd50d0307cb5c18f9f0bae2d0c"},{url:"/splash_screens/8.3__iPad_Mini_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",revision:"80a275a53cc1eaa0214be685708c00d2"},{url:"/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",revision:"5d4db9354c70868c92f73467ecab7a00"},{url:"/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",revision:"37352bf569c1757e3e449ba717b9baa1"},{url:"/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",revision:"7e578111f0c6d6ba3a4968a81ad926ea"},{url:"/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_11__iPhone_XR_landscape.png",revision:"83b4fd291defbf1982750a73826df2ca"},{url:"/splash_screens/iPhone_11__iPhone_XR_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_11__iPhone_XR_portrait.png",revision:"7533e5c77a7bf0d5ff2d7118b204b5c6"},{url:"/splash_screens/iPhone_11__iPhone_XR_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",revision:"63387ede93ce268c9e20f692e43760a4"},{url:"/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",revision:"ca3d8b8a7e35f68cf33d072fe5001b38"},{url:"/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",revision:"d916504778aa923be885e2335a752683"},{url:"/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",revision:"167bbfc9199efe6314fd392e637f4910"},{url:"/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14_Pro_Max_landscape.png",revision:"1ec4a08cbc113c87befa1677cfc839d0"},{url:"/splash_screens/iPhone_14_Pro_Max_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14_Pro_Max_portrait.png",revision:"122dfbbeac332dcd6b8889e5f535e8e3"},{url:"/splash_screens/iPhone_14_Pro_Max_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14_Pro_landscape.png",revision:"ce3c7359901984dc2777e3879dd4c876"},{url:"/splash_screens/iPhone_14_Pro_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14_Pro_portrait.png",revision:"43a112f6f3d1d6c1aa54c3e1c65a523d"},{url:"/splash_screens/iPhone_14_Pro_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",revision:"83ad461ce061b9b13339e93247611197"},{url:"/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",revision:"3d8346bf3cd690b71a84a144696fc17e"},{url:"/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",revision:"cd3022604ecd8c754dc2d053d077e8dd"},{url:"/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",revision:"7086f49b2affa78d8eb4def5f0135ebb"},{url:"/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",revision:"b73b35e31b069d85e2686feddf9b6acf"},{url:"/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",revision:"fc608b1a63ed010bf4b0293a97687a49"},{url:"/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"},{url:"/splash_screens/icon.png",revision:"3d8192770f8d1e2e55b8ac7c5eecf75f"},{url:"/splash_screens/icon.png:Zone.Identifier",revision:"9f100c12318dd868e0d4da51f5e8768e"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:_,event:n,state:i})=>_&&"opaqueredirect"===_.type?new Response(_.body,{status:200,statusText:"OK",headers:_.headers}):_}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const _=e.pathname;return!_.startsWith("/api/auth/")&&!!_.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
