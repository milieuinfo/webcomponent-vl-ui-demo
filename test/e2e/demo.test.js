const {VlElement} = require('vl-ui-core').Test;
const {assert, driver} = require('vl-ui-core').Test.Setup;
const VlDemoPagePage = require('./pages/vl-demo.page');

describe('vl-demo', async () => {
  const vlDemoPagePage = new VlDemoPagePage(driver);

  before(() => {
    return vlDemoPagePage.load();
  });

  it('als gebruiker kan ik de titel van de demo pagina bekijken', async () => {
    const demoPage = await vlDemoPagePage.getDemoPage();
    const title = await demoPage.getTitle();
    await assert.eventually.isTrue(title.isH(1));
    await assert.eventually.equal(title.getText(), 'Demo vl-demo');
  });

  it('als gebruiker kan ik de code van een demo voorbeeld bekijken', async () => {
    const demoPage = await vlDemoPagePage.getDemoPage();
    const demo = await demoPage.getDemo(1);
    const title = await demo.getTitle();
    await assert.eventually.equal(title.getText(), 'Demo 1');
    const slotElements = await demo.getSlotElements();
    const slotElement = await new VlElement(driver, slotElements[0]);
    await assert.eventually.equal(slotElement.getText(), 'dit is een demo');
    const code = await demo.getCode();
    await assert.eventually.equal(code.getTextContent(), '<p>dit is een demo</p>');
    await assert.eventually.isTrue(code.isDisplayed());
  });
});
