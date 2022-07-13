const salesService = require('../../../services/salesService');
const sales = require('../../../models/sales');
const chaiAsPromised = require('chai-as-promised');
const { ValidationError } = require('joi');
const { expect, use } = require('chai');
const sinon = require('sinon');
const { mockBody, addProductMock, idList, responseList } = require('../../mocks/sales.mock');

use(chaiAsPromised);


describe('SaleService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Função addNewSale', () => {
    it('deve retornar um objeto com o id retornado pelo model', async () => {
      const expectId = 1;
      sinon.stub(sales, 'create').resolves(expectId);
      sinon.stub(sales, 'addProducts').resolves();

      const response = await salesService.addNewSale(mockBody)
      expect(response.id).to.be.eq(expectId);
    });
  });

  describe('Função ValidateBody', () => {
    it('ao mandar um objeto válido retorna o objeto', async () => {
      const validBodyCall = await salesService.validateBody(addProductMock);
      expect(validBodyCall).to.be.deep.eq(addProductMock);
    });

    it('ao mandar sem productId deve retornar um erro', () => {
      const withouId = { quantity: 1 };
      expect(salesService.validateBody(withouId)).to.be.rejectedWith(ValidationError);
    });

    it('ao mandar sem quantity deve retornar um erro', () => {
      const withoutQ = { productId: 1 };
      expect(salesService.validateBody(withoutQ)).to.be.rejectedWith(ValidationError);
    });

    it('ao mandar quantity menor ou igual a zero deve retornar um erro', () => {
      const withoutQ = { productId: 1, quantity: 0 };
      expect(salesService.validateBody(withoutQ)).to.be.rejectedWith(ValidationError);
    });
  });

  describe('Função list', () => {
    it('deve retornar um array se o model retornar um array', () => {
      sinon.stub(sales, 'list').resolves(responseList);
      expect(salesService.list()).to.eventually.deep.equal(responseList);
    });
  });

  describe('Função getById', () => {
    it('deve retornar um objeto se o model retornar esse objeto', () => {
      sinon.stub(sales, 'getById').resolves(idList);
      return expect(salesService.getById(1)).to.eventually.deep.equal(idList);
    });

    it('deve retornar null se o model retornar null', () => {
      sinon.stub(sales, 'getById').resolves(null);
      return expect(salesService.getById(100)).to.eventually.be.null;
    });
  });

  describe('Função delete', () => {
    it('deve retornar true quando submetido um id', () => {
      sinon.stub(sales, 'deleteById').resolves(true);
      return expect(salesService.delete(3)).to.eventually.be.equal(true);
    });

    it('não deve ser possível deletar sem id', () => {
      return expect(salesService.delete()).to.eventually.be.equal(false);
    });
  })

});