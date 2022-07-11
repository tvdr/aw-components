(function(e){typeof define=="function"&&define.amd?define(e):e()})(function(){"use strict";var c=Object.defineProperty;var r=(e,t,n)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var a=(e,t,n)=>(r(e,typeof t!="symbol"?t+"":t,n),n);var e="",t=`<template id="alp-counter-template">
    <div x-data="counter">
        <span x-text="count"></span>
        <button @click="count+=step">Increment</button>
    </div>
</template>
`;class n extends HTMLElement{constructor(){super();a(this,"modulename","counter");a(this,"moduledata",{count:0,step:5});this.attachShadow({mode:"open"});const d=document.createElement("div");d.insertAdjacentHTML("beforeend",t);const l=d.querySelector("template");this.shadowRoot.appendChild(l.content.cloneNode(!0))}connectedCallback(){document.addEventListener("alpine:initialized",()=>{Alpine.data(this.modulename,()=>this.moduledata),Alpine.initTree(this.shadowRoot)})}}var i=`<template id="alp-dropdown-template">
    <div class="dropdown-wrapper"  x-data="dropdown">
        <div class="dropdown-toggler" @click="open = !open">
            <slot name="dropdown-toggler"></slot>
        </div>
        <div x-show="open" class="dropdown-content" @click.outside="close()">
            <slot name="dropdown-content"></slot>
        </div>
    </div>
</template>
`;class p extends HTMLElement{constructor(){super();a(this,"modulename","dropdown");a(this,"moduledata",{open:!1,toggle(){this.open=!this.open},close(){this.open=!1}});this.attachShadow({mode:"open"});const d=document.createElement("div");d.insertAdjacentHTML("beforeend",i);const l=d.querySelector("template");this.shadowRoot.appendChild(l.content.cloneNode(!0))}connectedCallback(){document.addEventListener("alpine:initialized",()=>{Alpine.data(this.modulename,()=>this.moduledata),Alpine.initTree(this.shadowRoot)})}}if(typeof Alpine=="undefined"){let o=document.createElement("script");o.setAttribute("defer",""),o.setAttribute("src","//unpkg.com/alpinejs"),document.head.appendChild(o)}customElements.define("alp-counter",n),customElements.define("alp-dropdown",p)});
