const productController = require('../../../controllers/productControllers');
const productService = require('../../../services/productsService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
// const { ValidationError } = require('joi');
const { listMock, mockObj, erroMessage } = require('../../mocks/product.mock');

const { expect, use } = require('chai');

use(chaiAsPromised);

describe('productController', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Função getAll', () => {
    it('deve chamar res.status com 200 e o array quando o service retornar a lista completa', async () => {
      sinon.stub(productService, 'list').resolves(listMock);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      await productController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(listMock)).to.be.true;
    });
  })

  describe('Função getById', () => {
    it('deve chamar res.status com 200 e res.json com o objeto quando o service retornar o objeto procurado', async () => {
      sinon.stub(productService, 'getById').resolves(mockObj);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 2 };

      await productController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockObj)).to.be.true;
    });

    it('deve chamar res.sendStatus com 404 quando o service retornar nulo', async () => {
      sinon.stub(productService, 'getById').resolves(null);

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 100 };

      await productController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith(erroMessage)).to.be.true;
    });

  })
}) 