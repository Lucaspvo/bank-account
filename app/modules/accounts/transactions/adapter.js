class TransactionAdapter {
  constructor(repository) {
    this.repository = new repository('transactions');
  }

  filter(params) {
    return this.repository.filter(params);
  }

  save(body) {
    return this.repository.save(body);
  }

  update(id, body) {
    const transaction = this.repository.find(id);
    const updatedTransaction = {
      ...transaction,
      ...body,
    };
    return this.repository.update(updatedTransaction);
  }

  delete(id) {
    this.repository.delete(id);
  }
}

module.exports = TransactionAdapter;