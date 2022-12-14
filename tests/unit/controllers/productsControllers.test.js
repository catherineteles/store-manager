const productController = require('../../../controllers/productControllers');
const productService = require('../../../services/productsService');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const { ValidationError } = require('joi');
const { listMock, mockObj, erroMessage, createMock, createdMock, editMock, editMockResult } = require('../../mocks/product.mock');

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

  describe('Função create', () => {
    it('ao mandar um req.body válido', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.body = createMock;

      sinon.stub(productService, 'create').resolves(1);

      await productController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(createdMock)).to.be.equal(true);
    });

    it('ao mandar um req.body inválido', () => {
      const req = {};
      const res = {};

      req.body = { name: '' };
      
      const calls = productController.create(req, res);

      expect(calls).to.be.rejectedWith(ValidationError);
    });
  })

  describe('Função update', () => {
    it('ao tentar editar um id inválido', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 'teste' };

      return expect(productController.updateProduct(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('ao tentar editar com um body inválido', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };
      req.body = {};

      return expect(productController.updateProduct(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('ao tentar editar com um id e um body válido', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };
      req.body = editMock;

      sinon.stub(productService, 'validateId').resolves({ id: 1 });
      sinon.stub(productService, 'validateBody').resolves(editMock);
      sinon.stub(productService, 'exists').resolves(true);
      sinon.stub(productService, 'edit').resolves(true);
      sinon.stub(productService, 'getById').resolves(editMockResult);

      await productController.updateProduct(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(editMockResult)).to.be.equal(true);
    });
  });

  describe('Função deleteProduct', () => {
    it('ao tentar deletar um id inválido', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 'teste' };

      return expect(productController.deleteProduct(req, res))
        .to.be.rejectedWith(ValidationError);
    });

    it('ao tentar deletar com um id válido', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      req.params = { id: 1 };

      sinon.stub(productService, 'validateId').resolves({ id: 1 });
      sinon.stub(productService, 'exists').resolves(true);
      sinon.stub(productService, 'delete').resolves(true);

      await productController.deleteProduct(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });

}) 