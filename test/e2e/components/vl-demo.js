const {VlElement} = require('vl-ui-core').Test;
const {By} = require('vl-ui-core').Test.Setup;
const {VlH1} = require('vl-ui-titles').Test.VlTitles;

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
    const element = await this.shadowRoot.findElement(By.css('code'));
    return new VlElement(this.driver, element);
  }
}

module.exports = VlDemo;
