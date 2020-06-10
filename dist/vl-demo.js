import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/prismjs/prism.js';
import '/node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js';
import '/node_modules/prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';
import '/node_modules/vl-ui-titles/dist/vl-titles.js';

/**
 * VlDemo
 * @class
 * @classdesc
 *
 * @extends HTMLElement
 *
 * @property {boolean} data-vl-title - Attribuut wordt gebruikt om de demo titel aan te geven.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-demo/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-demo/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-demo.html|Demo}
 *
 */
export class VlDemo extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['title'];
  }

  constructor() {
    super(`
      <style>
          @import '/node_modules/vl-ui-titles/src/style.css';
          @import '/node_modules/vl-ui-demo/dist/style.css';
          :host {
            display: block;
            position: relative;
          }
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
    this._prepareCode();
    Prism.highlightAllUnder(this._preElement);
  }

  _prepareCode() {
    const assignedElements = this._slotElement.assignedElements();
    if (assignedElements && assignedElements.length > 0) {
      const code = assignedElements[0].parentElement.cloneNode(true);
      [...code.children].forEach((child) => child.removeAttribute('class'));
      this._codeElement.insertAdjacentHTML('afterbegin', this._getCode(code));
      code.remove();
    }
  }

  _titleChangedCallback(oldValue, newValue) {
    this._titleElement.innerText = newValue;
  }

  _getCode(element) {
    let code = element.innerHTML;
    code = this._escapeTags(code);
    code = this._stripEmptyAttributeDefinition(code);
    return code;
  }

  _escapeTags(code) {
    const regex = /[\u00A0-\u9999<>&](?!#)/gim;
    return code.replace(regex, (match) => '&#' + match.charCodeAt(0) + ';');
  }

  _stripEmptyAttributeDefinition(code) {
    return code.split('=""').join('');
  }
}

define('vl-demo', VlDemo);
