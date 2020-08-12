import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-code-preview/dist/vl-code-preview.js';
import '/node_modules/vl-ui-grid/dist/vl-grid.js';
import '/node_modules/vl-ui-titles/dist/vl-titles.js';

/**
 * VlDemo
 * @class
 * @classdesc De demo component wordt gebruikt om code voorbeelden te geven inclusief zichtbaar maken van achterliggende code.
 *
 * @extends HTMLElement
 * @mixes vlElement
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
        @import '/node_modules/vl-ui-grid/src/style.css';
        @import '/node_modules/vl-ui-titles/src/style.css';
        @import '/node_modules/vl-ui-demo/dist/style.css';
      </style>
      <div is="vl-grid" data-vl-is-stacked>
        <div is="vl-column" data-vl-size="12">
          <h3 is="vl-h3">Demo</h3>
          <slot class="demo"></slot>
        </div>
        <div id="actions" is="vl-column" data-vl-size="12">
          <slot name="actions"></slot>
        </div>
        <div id="code-preview-container" is="vl-column" data-vl-size="12"></div>
      </div>
    `);
  }

  get _titleElement() {
    return this._shadow.querySelector('h3');
  }

  get _codeElement() {
    return this._shadow.querySelector('vl-code-preview');
  }

  get _slotElement() {
    return this._shadow.querySelector('slot');
  }

  get _actionsElement() {
    return this._shadow.querySelector('#actions');
  }

  get _actionsSlotElement() {
    return this._shadow.querySelector('slot[name="actions"]');
  }

  get _codePreviewContainerElement() {
    return this._shadow.querySelector('#code-preview-container');
  }

  _getCodePreviewTemplate(html) {
    return this._template(`
      <vl-code-preview>
        ${html}
      </vl-code-preview>
    `);
  }

  connectedCallback() {
    this._renderCode();
    this._processActions();
  }

  _renderCode() {
    const assignedElements = this._slotElement.assignedElements();
    if (assignedElements && assignedElements.length > 0) {
      const code = assignedElements[0].parentElement.cloneNode(true);
      this._codePreviewContainerElement.append(this._getCodePreviewTemplate(code.innerHTML));
      code.remove();
    }
  }

  _processActions() {
    if (this._actionsSlotElement.assignedElements().length == 0) {
      this._actionsElement.remove();
    }
  }

  _titleChangedCallback(oldValue, newValue) {
    this._titleElement.innerText = newValue;
  }
}

define('vl-demo', VlDemo);
