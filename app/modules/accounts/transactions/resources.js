const TransactionRepository = require('./repositories');
const TransactionAdapter = require('./adapter');
const TransactionSchema = require('./schema');

const adapter = new TransactionAdapter(TransactionRepository);
const schema = new TransactionSchema();

const getCollectionTransactions = function (req, res) {
  const response = adapter.filter(req.query);
  res.send(response);
};

const postCollectionTransactions = function (req, res, next) {
  const body = schema.validate(req, next);
  const response = adapter.save(body);
  res.status(201).send(response);
};

const putCollectionTransactions = function (req, res, next) {
  const body = schema.validate(req, next);
  const {transactionId} = req.params;
  const response = adapter.update(transactionId, body);
  res.send(response);
};

const deleteCollectionTransactions = function (req, res) {
  const {transactionId} = req.params;
  adapter.delete(transactionId);
  res.status(204).send();
};

module.exports = {
  getCollectionTransactions,
  postCollectionTransactions,
  putCollectionTransactions,
  deleteCollectionTransactions
};