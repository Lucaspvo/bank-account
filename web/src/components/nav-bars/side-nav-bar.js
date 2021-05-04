import React from 'react';
import './side-nav-bar.css';
import {connect} from 'react-redux';
import {changeTabActive} from '../../actions/side-nav';

const TABS = {
  add: 'add-transaction',
  list: 'transactions',
};

function mapStateToProps(state) {
  return {
    tabActive: state.sideNav.tabActive,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onTabChange(data) {
      dispatch(changeTabActive(data));
    },
  };
}

class SideNavBar extends React.Component {
  onTabChange(event, tabType) {
    event.preventDefault();
    this.props.onTabChange(tabType)
  }

  render() {
    return (
      <div className="side-nav-bar-section">
        <div className="inner-side-nav-bar">
          <a onClick={event => this.onTabChange(event, TABS.add)} href="/accounts/transactions">
            <div className={`add-transactions-tab ${this.props.tabActive === TABS.add ? 'active' : ''}`}>
              <label>Add transactions</label>
            </div>
          </a>
          <a onClick={event => this.onTabChange(event, TABS.list)} href="/accounts/transactions">
            <div className={`transactions-tab ${this.props.tabActive === TABS.list ? 'active' : ''}`}>
              <label>Transactions</label>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNavBar);