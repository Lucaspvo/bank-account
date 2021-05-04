import React from 'react';
import {Table, Button} from "react-bootstrap";
import moment from 'moment';
import './transactions-datagrid.css';
import {connect} from 'react-redux';
import {editTransaction} from '../../../actions/transaction';
import {changeTabActive} from '../../../actions/side-nav';

function mapDispatchToProps(dispatch) {
  return {
    editTransaction(data) {
      dispatch(editTransaction(data));
    },
    changeTabActive(data) {
      dispatch(changeTabActive(data));
    },
  };
}

class TransactionsDatagrid extends React.Component {
  formatDate(date) {
    const newDate = moment.utc(date);
    return newDate.format('YYYY-MM-DD');
  }

  onEditClick(transaction) {
    this.props.editTransaction(transaction);
    this.props.changeTabActive('add-transaction');
  }

  render() {
    const tableContent = this.props.transactions.map((transaction, index) => {
      return (
        <tr key={index}>
          <td>{transaction.category}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.description}</td>
          <td>{this.formatDate(transaction.date)}</td>
          <td>
            <Button
              className="edit-btn"
              variant="info"
              onClick={() => this.onEditClick(transaction)}
            >
              Edit
            </Button>
            <Button
              variant="info"
              onClick={() => this.props.onDelete(transaction.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <Table responsive data-test="transactions-datagrid">
        <thead data-test="datagrid-headers">
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody data-test="datagrid-body">
          {tableContent}
        </tbody>
      </Table>
    );
  }
}

export default connect(null, mapDispatchToProps)(TransactionsDatagrid);