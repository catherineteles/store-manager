const products = require('../../../models/products');
const connection = require('../../../models/connection');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listMock, mockObj } = require('../../mocks/product.mock');

use(chaiAsPromised);

describe('Product', () => {
  beforeEach(() => sinon.restore());

  describe('Testando a função getAll', () => {
    // Utilizando chaiAsPromised como visto na revisão do bloco 23
    it('deve retornar uma array se o connection.execute devolver um array', () => {
      // arranjo
      sinon.stub(connection, 'execute').resolves([listMock]);
      // ação/assertiva
      expect(products.getAll()).to.eventually.deep.equal(listMock);
    });

    it('deve falhar se o connection.execute disparar um erro', () => {
      // arranjo
      sinon.stub(connection, 'execute').rejects();
      // ação/assertiva
      expect(products.getAll()).to.eventually.rejected;
    });
  })

  describe('Testando a função getById', () => {
    it('deve retornar um objeto se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([[mockObj]]);
      expect(products.getById(2)).to
        .eventually.be.deep.eq(mockObj);
    });

    it('deve retornar nulo se o connection.execute retornar um array vazio', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
      
      const product = await products.getById(100);
      expect(product).to.be.null;
    });
  })
}); 