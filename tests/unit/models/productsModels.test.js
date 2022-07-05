const products = require('../../../models/products');
const connection = require('../../../models/connection');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { expect, use } = require('chai');
const { listMock, mockObj, createMock } = require('../../mocks/product.mock');

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

  describe('Testando a função create', () => {
    it('ao enviar um objeto com o atributo name deve ser possível adicionar o produto e retornar ID', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const expectId = 1;
      const id = await products.create({ name: 'Capacete Homem de Ferro' });
      expect(id).to.be.eq(expectId);
    });

    it('Se o objeto não tiver o atributo name deve retornar nulo', async () => {
      const result = await products.create({});
      expect(result).to.be.null;
    });

  })

  describe('Testando a função exists', () => {
    it('deve retornar true o se o connection.execute retornar um array com um objeto', async () => {
      sinon.stub(connection, 'execute').resolves([[mockObj]]);
      const response = products.exists(2); 
      expect(response).to
        .eventually.be.equal(true);
    });

    it('deve retornar falso se o connection.execute retornar um array vazio', async () => {
      sinon.stub(connection, 'execute').resolves([[]]);

      const response = await products.exists(100);
      expect(response).to.be.equal(false);
    });
  })
  
}); 