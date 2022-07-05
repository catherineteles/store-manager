const mocks = {
  saleMock: {
    id: 1,
    itemsSold: [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
  },
  mockBody: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ],
  addProductMock: {
      productId: 1,
      quantity: 1
  },
  addedProductMock: {
    id: 1,
    itensSold: {
    productId: 1,
    quantity: 1,
    },
  }
};

module.exports = mocks; 