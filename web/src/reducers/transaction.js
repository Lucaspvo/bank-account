export default function transaction(state = {}, action) {
  switch (action.type) {
    case 'TRANSACTION_CHANGE':
      return {
        ...action.payload,
      };
    case 'TAB_CHANGE':
      if (action.payload === 'transactions') return {};
      return state;
    default:
      return state;
  }
}