let {getCollectionTransactions} = require('../modules/accounts/transactions/resources.js');
let express = require('express');
let router = express.Router();

router.get('/:accountId/transactions', getCollectionTransactions);

module.exports = router;