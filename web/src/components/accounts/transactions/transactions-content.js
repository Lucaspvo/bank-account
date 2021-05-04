import React from 'react';
import {connect} from 'react-redux';
import TransactionsList from './transactions-list';
import TransactionForm from './transaction-form';
import './transactions-content.css';

function Content(props) {
  if (props.tabActive === 'transactions') {
    return <TransactionsList />;
  }
  return <TransactionForm />;
}

function mapStateToProps(state) {
  return {
    tabActive: state.sideNav.tabActive,
  };
}

class TransactionContent extends React.Component {
  render() {
    return(
      <div className="transactions-content-section">
        <Content tabActive={this.props.tabActive}/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TransactionContent);