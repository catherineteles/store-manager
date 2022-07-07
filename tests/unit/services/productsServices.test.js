const productService = require('../../../services/productsService');
const products = require('../../../models/products');
const chaiAsPromised = require('chai-as-promised');
const { ValidationError } = require('joi');
const { expect, use } = require('chai');
const sinon = require('sinon');
const { listMock, mockObj, createMock, editMock, editMockResult } = require('../../mocks/product.mock');

use(chaiAsPromised);


describe('ProductService', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('Função list', () => {
    it('deve retornar um array se o model retornar um array', () => {
      sinon.stub(products, 'getAll').resolves(listMock);
      expect(productService.list()).to.eventually.deep.equal(listMock);
    });
  })

  describe('Função getById', () => {
    it('deve retornar um objeto se o model retornar esse objeto', () => {
      sinon.stub(products, 'getById').resolves(mockObj);
      expect(productService.getById(2)).to.eventually.deep.equal(mockObj);
    });

    it('deve retornar null se o model retornar null', () => {
      sinon.stub(products, 'getById').resolves(null);
      expect(productService.getById(100)).to.eventually.be.null;
    });
  })

  describe('Função create', () => {
    it('deve retornar um id se o model retornar um id', () => {
      const expectId = 1;
      sinon.stub(products, 'create').resolves(expectId);
      expect(productService.create(createMock)).to.eventually.be.equal(expectId);
    });
  })

  describe('Função ValidateBody', () => {
    it('ao mandar um objeto válido retorna o objeto', async () => {
      const validBodyCall = await productService.validateBody(createMock);
      expect(validBodyCall).to.be.deep.eq(createMock);
    });

    it('ao mandar um name vazio deve retornar um erro', () => {
      const invalidName = { name: '' };
      expect(productService.validateBody(invalidName)).to.be.rejectedWith(ValidationError);   
    });

    it('ao mandar um name menor que 5 caracteres deve retornar um erro', () => {
      const invalidName = { name: 'Caps' };
      expect(productService.validateBody(invalidName)).to.be.rejectedWith(ValidationError);
    });
  })

  describe('Função ValidateId', () => {
    it('ao mandar um objeto válido retorna o objeto', async () => {
      const validBodyCall = await productService.validateId({ id: 1 });
      expect(validBodyCall).to.be.deep.eq({ id: 1 });
    });

    it('ao mandar um name vazio deve retornar um erro', () => {
      const invalidId = { id: '' };
      expect(productService.validateId(invalidId)).to.be.rejectedWith(ValidationError);
    });

    it('ao mandar um id menor que 1 deve retornar um erro', () => {
      const invalidId = { id: 0 };
      return expect(productService.validateId(invalidId)).to.be.rejectedWith(ValidationError);
    });
  })

  describe('Função exists', () => {
    it('deve retornar true se o model retornar true', () => {
      sinon.stub(products, 'exists').resolves(true);
      expect(productService.exists(2)).to.eventually.be.equal(true);
    });

    it('deve lançar um erro se o model retornar false', () => {
      sinon.stub(products, 'exists').resolves(false);
      expect(productService.exists(100)).to.be.rejectedWith('Product not found');
    });
  })

  describe('Função edit', () => {
    it('deve retornar true quando submetido um objeto com name', () => {
      sinon.stub(products, 'edit').resolves(true);
      return expect(productService.edit(1, editMock)).to.eventually.be.equal(true);
    });

    it('não deve ser possível editar um objeto sem o campo name', () => {
      sinon.stub(products, 'exists').resolves(true);
      return expect(productService.edit(1, { })).to.eventually.be.equal(false);
    });
  })

  describe('Função delete', () => {
    it('deve retornar true quando submetido um id', () => {
      sinon.stub(products, 'deleteById').resolves(true);
      return expect(productService.delete(1)).to.eventually.be.equal(true);
    });

    it('não deve ser possível deletar sem id', () => {
      return expect(productService.delete()).to.eventually.be.equal(false);
    });
  })

  
}) 