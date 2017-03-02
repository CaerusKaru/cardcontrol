import { IdcardPage } from './app.po';

describe('idcard App', () => {
  let page: IdcardPage;

  beforeEach(() => {
    page = new IdcardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
