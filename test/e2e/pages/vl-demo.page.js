const VlDemoPage = require('../components/vl-demo-page');
const { Page, Config } = require('vl-ui-core').Test;

class VlDemoPagePage extends Page {
    async getDemoPage() {
        return this._getDemoPage('#demo-page');
    }

    async load() {
        await super.load(Config.baseUrl + '/demo/vl-demo.html');
    }

    async _getDemoPage(selector) {
        return new VlDemoPage(this.driver, selector);
    }
}

module.exports = VlDemoPagePage;
