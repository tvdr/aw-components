import dropdownTemplate from '/src/components/dropdown/alp-dropdown-template.html?raw'

class AlpDropdownEl extends HTMLElement {
    modulename = 'dropdown';
    moduledata = {
        open: false,
        toggle() {
            this.open = ! this.open;
        },
        close() {
            this.open = false;
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
        tmpEl.insertAdjacentHTML('beforeend', dropdownTemplate);
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

export default AlpDropdownEl
