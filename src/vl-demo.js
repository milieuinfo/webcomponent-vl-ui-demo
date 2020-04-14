import { VlElement, define } from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/prismjs/prism.js';
import '/node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js';
import '/node_modules/vl-ui-titles/dist/vl-titles.js';

/**
 * VlDemo
 * @class
 * @classdesc 
 * 
 * @extends VlElement
 * 
 * @property {boolean} data-vl-title - Attribuut wordt gebruikt om de demo titel aan te geven.
 * 
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-demo/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-demo/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-demo.html|Demo}
 * 
 */
export class VlDemo extends VlElement(HTMLElement) {
    static get _observedAttributes() {
        return ['title'];
    }

    constructor() {
        super(`
            <style>
                @import '/node_modules/vl-ui-titles/src/style.css';
                @import '/src/style.css';
            </style>
            <div>
                <h3 is="vl-h3">Demo</h3>
                <div class="demo">
                    <slot></slot>
                </div>
                <pre class="line-numbers language-markup">
                    <code></code>
                </pre>
            </div>
        `);
    }

    get _titleElement() {
        return this._shadow.querySelector('h3');
    }

    get _preElement() {
        return this._shadow.querySelector('pre');
    }

    get _codeElement() {
        return this._preElement.querySelector('code');
    }

    get _slotElement() {
        return this._shadow.querySelector('slot');
    }

    connectedCallback() {
        this._renderCode();
    }

    _renderCode() {
        const regex = /[\u00A0-\u9999<>&](?!#)/gim;
        const elements = this._slotElement.assignedElements().map(element => {
            return element.outerHTML.trim().replace(regex, match => '&#' + match.charCodeAt(0) + ';');
        }).join('\n\t\t\t\t\t');
        this._codeElement.appendChild(this._template(`${elements}`));
        Prism.highlightAllUnder(this._preElement);
    }

    _titleChangedCallback(oldValue, newValue) {
        this._titleElement.innerText = newValue;
    }
}

define('vl-demo', VlDemo);