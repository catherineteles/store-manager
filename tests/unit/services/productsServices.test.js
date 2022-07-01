const productService = require('../../../services/productsService');
const products = require('../../../models/products');
const chaiAsPromised = require('chai-as-promised');
// const { ValidationError } = require('joi');
const { expect, use } = require('chai');
const sinon = require('sinon');
const { listMock, mockObj } = require('../../mocks/product.mock');

use(chaiAsPromised);


describe('SerieService', () => {
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
}) 