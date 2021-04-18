import React from 'react';
import {Table} from "react-bootstrap";
import moment from 'moment';

class TransactionsDatagrid extends React.Component {
  formatDate(date) {
    const newDate = moment.utc(date);
    return newDate.format('YYYY-MM-DD');
  }

  render() {
    const tableContent = this.props.transactions.map((transaction, index) => {
      return (
        <tr key={index}>
          <td>{transaction.category}</td>
          <td>{transaction.amount}</td>
          <td>{transaction.description}</td>
          <td>{this.formatDate(transaction.created_at)}</td>
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
          </tr>
        </thead>
        <tbody data-test="datagrid-body">
          {tableContent}
        </tbody>
      </Table>
    );
  }
}

export default TransactionsDatagrid;