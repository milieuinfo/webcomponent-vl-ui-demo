import {vlElement, define} from '/node_modules/vl-ui-core/dist/vl-core.js';
import '/node_modules/vl-ui-template/dist/vl-template.js';
import '/node_modules/vl-ui-header/dist/vl-header.js';
import '/node_modules/vl-ui-content-header/dist/vl-content-header.js';
import '/node_modules/vl-ui-grid/dist/vl-grid.js';
import '/node_modules/vl-ui-titles/dist/vl-titles.js';
import '/node_modules/vl-ui-footer/dist/vl-footer.js';

/**
 * VlDemoPage
 * @class
 * @classdesc
 *
 * @extends HTMLElement
 * @mixes vlElement
 *
 * @property {boolean} data-vl-link - Attribuut wordt gebruikt om de link naar de documentatie van Webuniversum te bepalen.
 * @property {boolean} data-vl-webcomponent - Attribuut wordt gebruikt om aan te geven over welke webcomponent de demo pagina gaat.
 * @property {number} data-vl-size - De teller van de verdeling van grote scherm.
 * @property {number} data-vl-small-size - De teller van de verdeling van kleine scherm.
 * @property {number} data-vl-extra-small-size - De teller van de verdeling van extra kleine scherm.
 *
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-demo/releases/latest|Release notes}
 * @see {@link https://www.github.com/milieuinfo/webcomponent-vl-demo/issues|Issues}
 * @see {@link https://webcomponenten.omgeving.vlaanderen.be/demo/vl-demo.html|Demo}
 */
export class VlDemoPage extends vlElement(HTMLElement) {
  static get _observedAttributes() {
    return ['link', 'webcomponent', 'size', 'medium-size', 'small-size', 'extra-small-size'];
  }

  constructor() {
    super(`
      <style>
        @import '/node_modules/vl-ui-grid/src/style.css';
        @import '/node_modules/vl-ui-titles/src/style.css';
        @import '/src/style.css';

        ::slotted(vl-demo:not(:first-child)) {
          display: block;
          margin-top: 3rem;
        }
      </style>
      <vl-template>
        <div slot="main">
          <vl-content-header>
            <img is="vl-image" slot="image" src="/node_modules/vl-ui-demo/dist/default.jpg" srcset="/node_modules/vl-ui-demo/dist/mobile.jpg 320w, /node_modules/vl-ui-demo/dist/default.jpg 1024w, /node_modules/vl-ui-demo/dist/wide.jpg 1600w">
            <a slot="context-link" href="https://webcomponenten.omgeving.vlaanderen.be">Vlaanderen</a>
            <a slot="title-link" href="https://webcomponenten.omgeving.vlaanderen.be">Webcomponenten</a>
          </vl-content-header>
          <section is="vl-region">
            <div is="vl-layout">
              <h1 is="vl-h1"></h1>
              <div id="grid" is="vl-grid" data-vl-is-stacked slot="main" data-vl-size="12">
                <div id="demo" is="vl-column">
                  <h2 is="vl-h2">Demo's</h2>
                  <slot></slot>
                </div>
              </div>
            </div>
          </section>
        </div>
      </vl-template>
    `);
    this._addMetaTag();
    const template = this._shadow.querySelector('vl-template');
    const params = new URLSearchParams(VlDemoPage.getSearchParams());
    const noHeader = !!params.get('no-header');
    const noFooter = !!params.get('no-footer');
    if (!noHeader) {
      template.prepend(this._template(`<vl-header id="header" slot="header" data-vl-identifier="59188ff6-662b-45b9-b23a-964ad48c2bfb" data-vl-development></vl-header>`));
    }
    if (!noFooter) {
      template.append(this._template(`<vl-footer id="footer" slot="footer" data-vl-identifier="0337f8dc-3266-4e7a-8f4a-95fd65189e5b" data-vl-development></vl-footer>`));
    }
  }

  static getSearchParams() {
    return window.location.search;
  }

  get _titleElement() {
    return this._shadow.querySelector('h1');
  }

  get _gridElement() {
    return this._shadow.querySelector('#grid');
  }

  get _linkElement() {
    return this._gridElement.querySelector('#link');
  }

  get _demoElement() {
    return this._gridElement.querySelector('#demo');
  }

  _getLinkTemplate(link) {
    return this._template(`
      <div id="link" is="vl-column">
        <h2 is="vl-h2">Documentatie</h2>
        <p>
          Meer voorbeelden en documentatie raadpleegbaar via de <a href="${link}">website</a> van Webuniversum.
        </p>
      </div>
    `);
  }

  _linkChangedCallback(oldValue, newValue) {
    if (this._linkElement) {
      this._linkElement.remove();
    }
    this._gridElement.insertBefore(this._getLinkTemplate(newValue), this._demoElement);
  }

  _webcomponentChangedCallback(oldValue, newValue) {
    this._titleElement.innerText = `Demo ${newValue}`;
  }

  _sizeChangedCallback(oldValue, newValue) {
    this._demoElement.setAttribute('data-vl-size', newValue);
  }

  _mediumSizeChangedCallback(oldValue, newValue) {
    this._demoElement.setAttribute('data-vl-medium-size', newValue);
  }

  _smallSizeChangedCallback(oldValue, newValue) {
    this._demoElement.setAttribute('data-vl-small-size', newValue);
  }

  _extraSmallSizeChangedCallback(oldValue, newValue) {
    this._demoElement.setAttribute('data-vl-extra-small-size', newValue);
  }

  _addMetaTag() {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(meta);
  }
}

define('vl-demo-page', VlDemoPage);
