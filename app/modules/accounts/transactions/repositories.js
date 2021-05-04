const DB = {
  transactions: [],
};

class TransactionRepository {
  constructor(model) {
    this.model = model;
  }

  filter(params) {
    let query = DB[this.model];
    if (params.filter) {
      query = query.filter(entity => entity.category === params.filter);
    }

    if (params.search) {
      const strRegExPattern = `.*${params.search}.*`;

      query = query.filter(entity => {
        return entity.amount.match(new RegExp(strRegExPattern))
          || entity.description.match(new RegExp(strRegExPattern, 'g'));
      });
    }

    return query;
  }

  save(entity) {
    if (!entity) throw new Error('Empty entity');

    entity.id = DB.transactions.length + 1;
    DB.transactions.push(entity);

    return DB.transactions[DB.transactions.length - 1];
  }

  update(transaction) {
    let index = DB.transactions.findIndex(element => element.id === transaction.id);
    if (index !== -1) {
      DB.transactions[index] = transaction;
    } else {
      throw new Error(`Transaction with id ${transaction.id} does not exist`);
    }

    return DB.transactions[index];
  }

  find(id) {
    return DB.transactions.find(transaction => transaction.id === id);
  }

  delete(id) {
    let index = DB.transactions.findIndex(transaction => transaction.id === parseInt(id, 10));
    if (index !== -1) {
      DB.transactions.splice(index, 1);
    } else {
      throw new Error(`Transaction with id ${id} does not exist`);
    }
  }
}

module.exports = TransactionRepository;