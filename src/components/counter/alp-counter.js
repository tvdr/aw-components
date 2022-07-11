import counterTemplate from '/src/components/counter/alp-counter-template.html?raw'

class AlpCounterEl extends HTMLElement {
    modulename = 'counter';
    moduledata = {
        count:0,
        step:1
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
        tmpEl.insertAdjacentHTML('beforeend', counterTemplate);
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

export default AlpCounterEl
