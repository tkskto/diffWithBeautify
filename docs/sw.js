if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,r,n)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const d={uri:location.origin+s.slice(1)};return Promise.all(r.map((s=>{switch(s){case"exports":return i;case"module":return d;default:return e(s)}}))).then((e=>{const s=n(...e);return i.default||(i.default=s),i}))})))}}define("./sw.js",["./workbox-d236bde4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/diff.8a20a95f.js",revision:"d1dc88f5787f8ee0bc0963723a4e9dc2"},{url:"assets/index.19adbd9f.js",revision:"69e9ae25643c2086fa09bf4f608e774d"},{url:"assets/index.b07fdec2.css",revision:"ea0443643e415e9b000daabbf4869dac"},{url:"assets/vendor.8b3eed67.js",revision:"3db1d33fd8fb17b6ff9a350395191595"},{url:"index.html",revision:"121460984c61bfee2727bc56c43eeb6c"},{url:"registerSW.js",revision:"05db2ca17de1883f70b194b89ca4d54e"},{url:"assets/img/icon_512.png",revision:"8e13a56d114d76830ff19e38bb282ef4"},{url:"assets/img/icon_256.png",revision:"8e13a56d114d76830ff19e38bb282ef4"},{url:"assets/img/icon_128.png",revision:"600fb7f0ab821656d3d241d4bca65a19"},{url:"assets/img/icon_64.png",revision:"5f2f55730d115a8c7914c2c8792e4662"},{url:"manifest.webmanifest",revision:"3735d2ed596a48478345fa7ca5b8c327"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
