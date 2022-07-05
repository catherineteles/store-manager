const salesService = require('../../../services/salesService');
const sales = require('../../../models/sales');
const chaiAsPromised = require('chai-as-promised');
const { ValidationError } = require('joi');
const { expect, use } = require('chai');
const sinon = require('sinon');
const { mockBody, saleMock, addProductMock } = require('../../mocks/sales.mock');

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
  })

}) 