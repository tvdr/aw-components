(function(r){typeof define=="function"&&define.amd?define(r):r()})(function(){"use strict";var E=Object.defineProperty;var M=(r,i,s)=>i in r?E(r,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[i]=s;var m=(r,i,s)=>(M(r,typeof i!="symbol"?i+"":i,s),s);var r="",i=`<template id="alp-counter-template">
    <div x-data="counter">
        <span x-text="count"></span>
        <button @click="count+=step">Increment</button>
    </div>
</template>
`;class s extends HTMLElement{constructor(){super();m(this,"modulename","counter");m(this,"moduledata",{count:0,step:5});this.attachShadow({mode:"open"});const o=document.createElement("div");o.insertAdjacentHTML("beforeend",i);const c=o.querySelector("template");this.shadowRoot.appendChild(c.content.cloneNode(!0))}connectedCallback(){document.addEventListener("alpine:initialized",()=>{Alpine.data(this.modulename,()=>this.moduledata),Alpine.initTree(this.shadowRoot)})}}var b=`<template id="alp-dropdown-template">
    <div class="dropdown-wrapper"  x-data="dropdown">
        <div class="dropdown-toggler" @click="open = !open">
            <slot name="dropdown-toggler"></slot>
        </div>
        <div x-show="open" class="dropdown-content" @click.outside="close()">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>
`;class x extends HTMLElement{constructor(){super();m(this,"modulename","dropdown");m(this,"moduledata",{open:!1,toggle(){this.open=!this.open},close(){this.open=!1}});this.attachShadow({mode:"open"});const o=document.createElement("div");o.insertAdjacentHTML("beforeend",b);const c=o.querySelector("template");this.shadowRoot.appendChild(c.content.cloneNode(!0))}connectedCallback(){document.addEventListener("alpine:initialized",()=>{Alpine.data(this.modulename,()=>this.moduledata),Alpine.initTree(this.shadowRoot)})}}var g=`<template id="alp-colorpicker-template">
    <div x-data="colorpicker">
        <label for="red">Red</label>
        <input id="red" type="number" min="0" max="255" x-model="red" placeholder="red">
        <input type="range" min="0" max="255" x-model="red">
        <br>
        <label for="green">Green</label>
        <input id="green" type="number" min="0" max="255" x-model="green" placeholder="green">
        <input type="range" min="0" max="255" x-model="green">
        <br>
        <label for="blue">Blue</label>
        <input id="blue" type="number" min="0" max="255" x-model="blue" placeholder="blue">
        <input type="range" min="0" max="255" x-model="blue">
        <br>
        <br>
        <div :style="{ width: '50px', height: '50px',backgroundColor:'rgb('+red+','+green+','+blue+')'}"></div>
        <br>
        <br>
        <button @click="fillCanvas()">Fill canvas with random colors</button>
        <br>
        <br>
        <span>Click on canvas to select color</span>
        <br>
        <br>
        <canvas width="300px" height="300px"></canvas>


    </div>
</template>
`;class w extends HTMLElement{constructor(){super();m(this,"modulename","colorpicker");m(this,"moduledata",{init(){let o=this;this.canvasEl=this.$el.querySelector("canvas");function c(l){var e=0,t=0;if(l.offsetParent){do e+=l.offsetLeft,t+=l.offsetTop;while(l=l.offsetParent);return{x:e,y:t}}}function h(l,e){var t=c(l);return{x:e.pageX-t.x,y:e.pageY-t.y}}this.canvasEl.addEventListener("click",function(l){var e=h(this,l),t=this.getContext("2d"),n=t.getImageData(e.x,e.y,1,1).data;o.red=n[0],o.green=n[1],o.blue=n[2]}),this.fillCanvas()},red:0,green:0,blue:0,available_colors:[],canvasEl:!1,fillCanvas(){const o=(e,t,n)=>{e/=255,t/=255,n/=255;const d=Math.max(e,t,n),a=d-Math.min(e,t,n),p=a?d===e?(t-n)/a:d===t?2+(n-e)/a:4+(e-t)/a:0;return[60*p<0?60*p+360:60*p,100*(a?d<=.5?a/(2*d-a):a/(2-(2*d-a)):0),100*(2*d-a)/2]},c=(e,t,n)=>{t/=100,n/=100;const d=f=>(f+e/30)%12,a=t*Math.min(n,1-n),p=f=>n-a*Math.max(-1,Math.min(d(f)-3,Math.min(9-d(f),1)));return[255*p(0),255*p(8),255*p(4)]};let h=[];for(let e=0;e<30;e++)for(let t=0;t<30;t++){let n=Math.round(Math.random()*255),d=Math.round(Math.random()*(255-0)),a=Math.round(Math.random()*(255-0));h.push(o(n,d,a))}h.sort((e,t)=>Math.round(e[0]*100)/100-Math.round(t[0]*100)/100||Math.round(e[2]*100)/100-Math.round(t[2]*100)/100),console.log(h);const l=this.canvasEl.getContext("2d");h.map((e,t)=>{let n=c(e[0],e[1],e[2]);l.fillStyle=`rgb(${n[0]},${n[1]},${n[2]})`,l.fillRect(t%30*10,Math.floor(t/30)*10,10,10)})}});this.attachShadow({mode:"open"});const o=document.createElement("div");o.insertAdjacentHTML("beforeend",g);const c=o.querySelector("template");this.shadowRoot.appendChild(c.content.cloneNode(!0))}connectedCallback(){document.addEventListener("alpine:initialized",()=>{Alpine.data(this.modulename,()=>this.moduledata),Alpine.initTree(this.shadowRoot)})}}if(typeof Alpine=="undefined"){let u=document.createElement("script");u.setAttribute("defer",""),u.setAttribute("src","//unpkg.com/alpinejs"),document.head.appendChild(u)}customElements.define("alp-counter",s),customElements.define("alp-dropdown",x),customElements.define("alp-colorpicker",w)});
