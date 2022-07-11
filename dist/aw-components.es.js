var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var style = "";
var counterTemplate = '<template id="alp-counter-template">\n    <div x-data="counter">\n        <span x-text="count"></span>\n        <button @click="count+=step">Increment</button>\n    </div>\n</template>\n';
class AlpCounterEl extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "modulename", "counter");
    __publicField(this, "moduledata", {
      count: 0,
      step: 1
    });
    this.attachShadow({ mode: "open" });
    const tmpEl = document.createElement("div");
    tmpEl.insertAdjacentHTML("beforeend", counterTemplate);
    const elTemplate = tmpEl.querySelector("template");
    this.shadowRoot.appendChild(elTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    document.addEventListener("alpine:initialized", () => {
      Alpine.data(this.modulename, () => this.moduledata);
      Alpine.initTree(this.shadowRoot);
    });
  }
}
var dropdownTemplate = '<template id="alp-dropdown-template">\n    <div class="dropdown-wrapper"  x-data="dropdown">\n        <div class="dropdown-toggler" @click="open = !open">\n            <slot name="dropdown-toggler"></slot>\n        </div>\n        <div x-show="open" class="dropdown-content" @click.outside="close()">\n            <slot name="dropdown-content"></slot>\n        </div>\n    </div>\n</template>\n';
class AlpDropdownEl extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "modulename", "dropdown");
    __publicField(this, "moduledata", {
      open: false,
      toggle() {
        this.open = !this.open;
      },
      close() {
        this.open = false;
      }
    });
    this.attachShadow({ mode: "open" });
    const tmpEl = document.createElement("div");
    tmpEl.insertAdjacentHTML("beforeend", dropdownTemplate);
    const elTemplate = tmpEl.querySelector("template");
    this.shadowRoot.appendChild(elTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    document.addEventListener("alpine:initialized", () => {
      Alpine.data(this.modulename, () => this.moduledata);
      Alpine.initTree(this.shadowRoot);
    });
  }
}
if (typeof Alpine == "undefined") {
  let alpineScript = document.createElement("script");
  alpineScript.setAttribute("defer", "");
  alpineScript.setAttribute("src", "//unpkg.com/alpinejs");
  document.head.appendChild(alpineScript);
}
customElements.define("alp-counter", AlpCounterEl);
customElements.define("alp-dropdown", AlpDropdownEl);
