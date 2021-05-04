import React from 'react';
import './transactions-list.css';
import {
  Card,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
  Alert,
  Spinner
} from 'react-bootstrap';
import queryString from 'query-string';
import {debounce} from 'lodash';
import TransactionsDatagrid from './transactions-datagrid';
import Toast from '../../toast';

const CATEGORIES = ['Not set', 'Salary', 'Food', 'Transport', 'House', 'Other'];

class TransactionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      query: {},
      searchInput: '',
      show: false,
      loading: false,
    };

    this.fetchTransactionDebounce = debounce(this.fetchTransactions.bind(this), 1000);
  }

  async componentDidMount() {
    this.fetchTransactions();
  }

  fetchTransactions() {
    const params = `?${queryString.stringify(this.state.query)}`;
    this.setState({
      loading: true,
    }, async () => {
      try {
        const response = await fetch(`http://localhost:3030/accounts/1/transactions${params}`);

        if (response.status === 200) {
          const json = await response.json();
          console.log(json);

          this.setState({
            transactions: json,
          });
        } else {
          this.setState({
            show: true,
            message: 'An error occurred while fetching transactions',
            title: 'Error',
          });
        }
      } catch (error) {
        this.setState({
          show: true,
          message: 'An error occurred while fetching transactions',
          title: 'Error',
        });
      } finally {
        this.setState({
          loading: false,
        });
      }
    });
  }

  categorySelected(data) {
    this.setState({
      query: {
        ...this.state.query,
        filter: data,
      },
    }, this.fetchTransactions);
  }

  onChange(event) {
    this.setState({
      query: {
        ...this.state.query,
        search: event.target.value,
      },
      searchInput: event.target.value,
    });
    this.fetchTransactionDebounce();
  }

  setShow(show) {
    this.setState({
      show,
    });
  }

  async deleteTransaction(id) {
    const response = await fetch(`http://localhost:3030/accounts/1/transactions/${id}`, {
      method: 'delete',
    });

    if (response.status === 204) {
      console.log('AQUI');
      this.fetchTransactions();
      this.setState({
        show: true,
        message: 'Transaction successfully deleted',
        title: 'Success',
      });
    } else {
      this.setState({
        show: true,
        message: 'Unable to delete transaction',
        title: 'Error',
      });
    }
  }

  render() {
    const dropdownOptions = CATEGORIES.map((category, index) => {
      return (
        <Dropdown.Item
          key={index}
          eventKey={category !== 'Not set' ? category.toLowerCase() : null}
          onSelect={this.categorySelected.bind(this)}
        >
          {category}
        </Dropdown.Item>
      );
    });

    let responseData;

    if (this.state.loading) {
      responseData = (
        <Alert className="alert-no-data-div" data-test="no-data-div" variant="warning">
          <Spinner data-test="loading-spinner" animation="border" />
        </Alert>
      );
    } else if (!this.state.loading && this.state.transactions.length === 0) {
      responseData = (
        <Alert className="alert-no-data-div" data-test="no-data-div" variant="warning">
          No transactions were found!
        </Alert>
      );
    } else {
      responseData = (
        <TransactionsDatagrid
          data-test="transactions-datagrid"
          transactions={this.state.transactions}
          onDelete={this.deleteTransaction.bind(this)}
        />
      );
    }

    return (
      <div className="transactions-list-section" data-test="transactions-list-section">
        <Toast
          title={this.state.title}
          show={this.state.show}
          setShow={this.setShow.bind(this)}
          message={this.state.message}
          data-test="error-toast"
        />

        <div className="inner-transactions-list">
          <Card bg="light">
            <Card.Body>
              <Card.Title>Transactions</Card.Title>
              <div className="row form-group">
                <div className="col-lg-2 col-md-2 col-sm-2">
                  <DropdownButton
                    variant="primary"
                    title="Filter by category"
                  >
                    {dropdownOptions}
                  </DropdownButton>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <InputGroup>
                    <FormControl
                      value={this.state.searchInput}
                      onChange={this.onChange.bind(this)}
                      placeholder="Search transaction"
                    />
                  </InputGroup>
                </div>
              </div>
              {responseData}
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default TransactionsList;