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
      step: 5
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
var colorpickerTemplate = `<template id="alp-colorpicker-template">
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
`;
class AlpColorpickerEl extends HTMLElement {
  constructor() {
    super();
    __publicField(this, "modulename", "colorpicker");
    __publicField(this, "moduledata", {
      init() {
        let _this = this;
        this.canvasEl = this.$el.querySelector("canvas");
        function getElementPosition(obj) {
          var curleft = 0, curtop = 0;
          if (obj.offsetParent) {
            do {
              curleft += obj.offsetLeft;
              curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: curleft, y: curtop };
          }
          return void 0;
        }
        function getEventLocation(element, event) {
          var pos = getElementPosition(element);
          return {
            x: event.pageX - pos.x,
            y: event.pageY - pos.y
          };
        }
        this.canvasEl.addEventListener("click", function(event) {
          var eventLocation = getEventLocation(this, event);
          var context = this.getContext("2d");
          var pixelData = context.getImageData(eventLocation.x, eventLocation.y, 1, 1).data;
          _this.red = pixelData[0];
          _this.green = pixelData[1];
          _this.blue = pixelData[2];
        });
        this.fillCanvas();
      },
      red: 0,
      green: 0,
      blue: 0,
      available_colors: [],
      canvasEl: false,
      fillCanvas() {
        const RGBToHSL = (r, g, b) => {
          r /= 255;
          g /= 255;
          b /= 255;
          const l = Math.max(r, g, b);
          const s = l - Math.min(r, g, b);
          const h = s ? l === r ? (g - b) / s : l === g ? 2 + (b - r) / s : 4 + (r - g) / s : 0;
          return [
            60 * h < 0 ? 60 * h + 360 : 60 * h,
            100 * (s ? l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s)) : 0),
            100 * (2 * l - s) / 2
          ];
        };
        const HSLToRGB = (h, s, l) => {
          s /= 100;
          l /= 100;
          const k = (n) => (n + h / 30) % 12;
          const a = s * Math.min(l, 1 - l);
          const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
          return [255 * f(0), 255 * f(8), 255 * f(4)];
        };
        let colors = [];
        for (let x = 0; x < 30; x++) {
          for (let y = 0; y < 30; y++) {
            let red = Math.round(Math.random() * (255 - 0));
            let green = Math.round(Math.random() * (255 - 0));
            let blue = Math.round(Math.random() * (255 - 0));
            colors.push(RGBToHSL(red, green, blue));
          }
        }
        colors.sort((a, b) => {
          return Math.round(a[0] * 100) / 100 - Math.round(b[0] * 100) / 100 || Math.round(a[2] * 100) / 100 - Math.round(b[2] * 100) / 100;
        });
        console.log(colors);
        const ctx = this.canvasEl.getContext("2d");
        colors.map((color, index) => {
          let rgb = HSLToRGB(color[0], color[1], color[2]);
          ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
          ctx.fillRect(index % 30 * 10, Math.floor(index / 30) * 10, 10, 10);
        });
      }
    });
    this.attachShadow({ mode: "open" });
    const tmpEl = document.createElement("div");
    tmpEl.insertAdjacentHTML("beforeend", colorpickerTemplate);
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
customElements.define("alp-colorpicker", AlpColorpickerEl);
