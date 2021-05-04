export function editTransaction(data) {
  return {
    type: 'TRANSACTION_CHANGE',
    payload: data,
  };
};
