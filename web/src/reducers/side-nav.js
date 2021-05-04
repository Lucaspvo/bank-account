export default function sideNav(state = {tabActive: 'transactions'}, action) {
  switch (action.type) {
    case 'TAB_CHANGE':
      return {
        tabActive: action.payload,
      };
    default:
      return state;
  }
}