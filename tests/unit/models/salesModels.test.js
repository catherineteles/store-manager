const sales = require('../../../models/sales');
const connection = require('../../../models/connection');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { addProductMock, responseList, idList } = require('../../mocks/sales.mock');

use(chaiAsPromised);

describe('Sales', () => {
  beforeEach(() => sinon.restore());

  describe('Testando a função addProduct', () => {
    it('ao criar uma nova venda ela retorna o id da venda', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const expectId = 1;
      const id = 1;
      const response = await sales.addProducts(id, addProductMock);
      expect(response).to.be.eq(expectId);
    });
  });

  describe('Testando a função create', () => {
    it('com o id da venda e do produto ', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const expectId = 1;
      const id = await sales.create();
      expect(id).to.be.eq(expectId);
    });
  });

  describe('Testando a função list', () => {
    it('deve retornar uma array se o connection.execute devolver um array', () => {
      sinon.stub(connection, 'execute').resolves([responseList]);
      return expect(sales.list()).to.eventually.deep.equal(responseList);
    });

    it('deve falhar se o connection.execute disparar um erro', () => {
      sinon.stub(connection, 'execute').rejects();
      expect(sales.list()).to.eventually.rejected;
    });
  });

  describe('Testando a função getById', () => {
    it('deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([[idList]]);
      return expect(sales.getById(1)).to
        .eventually.be.deep.eq(idList);
    });

    it('deve retornar nulo se o connection.execute retornar um array vazio', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const sale = await sales.getById(100);
      expect(sale).to.be.null;
    });
  })

}); 