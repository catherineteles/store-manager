const salesController = require('../../../controllers/salesControllers');
const productService = require('../../../services/productsService');
const salesService = require('../../../services/salesService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { ValidationError } = require('joi');

const { expect, use } = require('chai');
const { mockBody, saleMock } = require('../../mocks/sales.mock');

use(chaiAsPromised);

describe('salesController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  
  describe('Função create', () => {
    it('ao mandar um req.body válido retorna o objeto com a venda', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = mockBody;
      sinon.stub(salesService, 'validateBody').resolves();
      sinon.stub(productService, 'exists').resolves();
      sinon.stub(salesService, 'addNewSale').resolves(saleMock);

      await salesController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(saleMock)).to.be.equal(true);
    });

    it('ao mandar um req.body sem productId deve retornar um erro', async () => {
      const req = {};
      const res = {};

      req.body = [{ quantity: 1 }];

      return expect(salesController.create(req, res))
        .to.eventually.be.rejectedWith(ValidationError);
    });
  })
}) 