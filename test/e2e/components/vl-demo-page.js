const { VlElement } = require('vl-ui-core').Test;
const { By } = require('vl-ui-core').Test.Setup;
const { VlH1 } = require('vl-ui-titles').Test.VlTitles;
const VlDemo = require('./vl-demo');

class VlDemoPage extends VlElement {
    async getTitle() {
        const element = await this.shadowRoot.findElement(By.css('h1'));
        return new VlH1(this.driver, element);
    }

    async getDemo(number) {
        const demos = await this._getDemos();
        return demos[--number];
    }

    async _getDemos() {
        const elements = await this.findElements(By.css('vl-demo'));
        return Promise.all(elements.map(element => new VlDemo(this.driver, element)));
    }
}

module.exports = VlDemoPage;
