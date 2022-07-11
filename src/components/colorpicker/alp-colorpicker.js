import colorpickerTemplate from '/src/components/colorpicker/alp-colorpicker-template.html?raw'

class AlpColorpickerEl extends HTMLElement {
    modulename = 'colorpicker';
    moduledata = {
        init() {
            let _this = this;
            this.canvasEl = this.$el.querySelector('canvas');

            function getElementPosition(obj) {
                var curleft = 0, curtop = 0;
                if (obj.offsetParent) {
                    do {
                        curleft += obj.offsetLeft;
                        curtop += obj.offsetTop;
                    } while (obj = obj.offsetParent);
                    return {x: curleft, y: curtop};
                }
                return undefined;
            }

            function getEventLocation(element, event) {
                // Relies on the getElementPosition function.
                var pos = getElementPosition(element);

                return {
                    x: (event.pageX - pos.x),
                    y: (event.pageY - pos.y)
                };
            }

            this.canvasEl.addEventListener("click", function (event) {
                // Get the coordinates of the click
                var eventLocation = getEventLocation(this, event);
                // Get the data of the pixel according to the location generate by the getEventLocation function
                var context = this.getContext('2d');
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
                const h = s
                    ? l === r
                        ? (g - b) / s
                        : l === g
                            ? 2 + (b - r) / s
                            : 4 + (r - g) / s
                    : 0;
                return [
                    60 * h < 0 ? 60 * h + 360 : 60 * h,
                    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
                    (100 * (2 * l - s)) / 2,
                ];
            };
            const HSLToRGB = (h, s, l) => {
                s /= 100;
                l /= 100;
                const k = n => (n + h / 30) % 12;
                const a = s * Math.min(l, 1 - l);
                const f = n =>
                    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
                return [255 * f(0), 255 * f(8), 255 * f(4)];
            };

            let colors = [];

            for (let x = 0; x < 30; x++) {
                for (let y = 0; y < 30; y++) {
                    let red = Math.round(Math.random() * (255 - 0));
                    let green = Math.round(Math.random() * (255 - 0));
                    let blue = Math.round(Math.random() * (255 - 0));
                    colors.push(RGBToHSL(red,green,blue));
                }
            }

            colors.sort((a,b)=>{
                return (Math.round(a[0] * 100) / 100) - (Math.round(b[0] * 100) / 100) || (Math.round(a[2] * 100) / 100) - (Math.round(b[2] * 100) / 100);
            })
            console.log(colors);

            const ctx = this.canvasEl.getContext('2d');
            colors.map((color, index) => {
                let rgb = HSLToRGB(color[0],color[1],color[2]);
                ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                ctx.fillRect((index%30)*10, Math.floor(index/30)*10, 10, 10);
            })

        }
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        //add bootstrap css
        /*let bsLink = document.createElement('link');
        bsLink.setAttribute('href','https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css')
        bsLink.setAttribute('rel','stylesheet')
        this.shadowRoot.appendChild(bsLink)*/


        //append template
        const tmpEl = document.createElement('div');
        tmpEl.insertAdjacentHTML('beforeend', colorpickerTemplate);
        const elTemplate = tmpEl.querySelector('template');
        this.shadowRoot.appendChild(elTemplate.content.cloneNode(true))

    }

    connectedCallback() {
        //Init alpine on shadowdom
        document.addEventListener('alpine:initialized', () => {
            Alpine.data(this.modulename, () => (this.moduledata))
            Alpine.initTree(this.shadowRoot)
        })
    }
}

export default AlpColorpickerEl
