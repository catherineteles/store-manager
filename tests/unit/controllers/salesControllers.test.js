const salesController = require('../../../controllers/salesControllers');
const productService = require('../../../services/productsService');
const salesService = require('../../../services/salesService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { ValidationError } = require('joi');

const { expect, use } = require('chai');
const { mockBody, saleMock, responseList, idList } = require('../../mocks/sales.mock');

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
  });
  describe('Função getAll', () => {
    it('deve chamar res.status com 200 e o array quando o service retornar a lista completa', async () => {
      sinon.stub(salesService, 'list').resolves(responseList);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await salesController.getList(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(responseList)).to.be.true;
    });
  })

  describe('Função getById', () => {
    it('deve chamar res.status com 200 e res.json com o objeto quando o service retornar o objeto procurado', async () => {
      sinon.stub(salesService, 'getById').resolves(idList);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };

      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(idList)).to.be.true;
    });
    it('deve chamar res.status com 404 quando o service retornar null', async () => {
      sinon.stub(salesService, 'getById').resolves(null);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 100 };

      await salesController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.true;
    });
  });
}) 