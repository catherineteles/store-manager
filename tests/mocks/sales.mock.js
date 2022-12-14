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
  },
  responseList: [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    },
  ],

  idList: [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    },
  ],

  editMock: {
    productId: 1,
    quantity: 10,
  },
};

module.exports = mocks; 