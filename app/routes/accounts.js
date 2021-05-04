let {
  getCollectionTransactions,
  postCollectionTransactions,
  putCollectionTransactions,
  deleteCollectionTransactions
} = require('../modules/accounts/transactions/resources.js');
let express = require('express');
let router = express.Router();

router.get('/:accountId/transactions', getCollectionTransactions);

router.post('/:accountId/transactions', postCollectionTransactions);

router.put('/:accountId/transactions/:transactionId', putCollectionTransactions);

router.delete('/:accountId/transactions/:transactionId', deleteCollectionTransactions);

module.exports = router;