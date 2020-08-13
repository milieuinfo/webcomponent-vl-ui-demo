const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const {VlH1} = require('vl-ui-titles').Test.VlTitles;
const {VlCodePreview} = require('vl-ui-code-preview').Test;

class VlDemo extends VlElement {
  async getTitle() {
    const element = await this.shadowRoot.findElement(By.css('h3'));
    return new VlH1(this.driver, element);
  }

  async getSlotElements() {
    const slot = await this.shadowRoot.findElement(By.css('slot'));
    return this.getAssignedElements(slot);
  }

  async getCode() {
    const element = await this.shadowRoot.findElement(By.css('vl-code-preview'));
    return new VlCodePreview(this.driver, element);
  }
}

module.exports = VlDemo;
