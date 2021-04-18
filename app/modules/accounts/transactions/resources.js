const TransactionRepository = require('./repositories');
const repository = new TransactionRepository('transactions');

const getCollectionTransactions = function (req, res) {
  const response = repository.filter(req.query);
  res.send(response);
};

module.exports = {
  getCollectionTransactions,
};