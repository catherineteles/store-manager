const sales = require('../../../models/sales');
const connection = require('../../../models/connection');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { addProductMock } = require('../../mocks/sales.mock');

use(chaiAsPromised);

describe('Product', () => {
  beforeEach(() => sinon.restore());

  describe('Testando a função addProduct', () => {
    it('ao criar uma nova venda ela retorna o id da venda', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const expectId = 1;
      const id = await sales.addProducts(addProductMock);
      expect(id).to.be.eq(expectId);
    });
  });

  describe('Testando a função create', () => {
    it('com o id da venda e do produto ', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const expectId = 1;
      const id = await sales.create();
      expect(id).to.be.eq(expectId);
    });
  })
}); 