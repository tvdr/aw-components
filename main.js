import './style.css';
import AlpCounterEl from "./src/components/counter/alp-counter";
import AlpDropdownEl from "./src/components/dropdown/alp-dropdown";

//load alpinejs once
if (typeof Alpine == 'undefined'){
    let alpineScript = document.createElement('script');
    alpineScript.setAttribute('defer', '');
    alpineScript.setAttribute('src', '//unpkg.com/alpinejs');
    document.head.appendChild(alpineScript);
}


customElements.define('alp-counter',AlpCounterEl)
customElements.define('alp-dropdown',AlpDropdownEl)
