import React from 'react';
import {Card, Form, Button} from "react-bootstrap";
import CurrencyInput from '../../core/currency-input';
import DatePicker from 'react-date-picker';
import './transaction-form.css';
import { Field, reduxForm } from 'redux-form'
import Dropdown from '../../core/drop-down';
import Toast from "../../toast";
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';

const CATEGORIES = ['Not set', 'Salary', 'Food', 'Transport', 'House', 'Other'];

function mapStateToProps(state) {
  return {
    initialValues: {
      ...state.transaction,
    },
  };
}

const validate = values => {
  const errors = {};
  if (!values.category) {
    errors.category = 'Field required';
  }
  if (!values.amount) {
    errors.amount = 'Field required';
  }
  if (!values.date) {
    errors.date = 'Field required';
  }
  return errors;
};

function renderError({error, touched}) {
  if (touched && error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }
}

function renderInput({input, label, placeholder, meta}) {
  if (input.name === 'category') {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Dropdown
          variant="primary"
          title="Filter by category"
          categories={CATEGORIES}
          value={input.value}
          {...input}
        />
        {renderError(meta)}
      </Form.Group>
    );
  }

  if (input.name === 'amount') {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <CurrencyInput
          {...input}
          placeholder={placeholder}
        />
        {renderError(meta)}
      </Form.Group>
    );
  }

  if (input.name === 'date') {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <DatePicker
          className="form-control"
          value={input.value}
          onChange={input.onChange}
        />
        {renderError(meta)}
      </Form.Group>
    );
  }

  if (input.name === 'description') {
    return (
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...input}
        />
      </Form.Group>
    );
  }

  return '';
}

async function onSubmit(values) {
  try {
    let url;
    let method;

    if (isEmpty(this.props.initialValues)) {
      url = 'http://localhost:3030/accounts/1/transactions';
      method = 'post';
    } else {
      url = `http://localhost:3030/accounts/1/transactions/${this.props.initialValues.id}`;
      method = 'put';
    }

    const response = await fetch(url, {
      body: JSON.stringify(values),
      method,
      headers: {
        'Content-type': 'application/json',
      },
    });

    if ((method === 'post' && response.status === 201) ||
      (method === 'put' && response.status === 200)) {
      this.setState({
        show: true,
        message: 'Transaction added successfully',
        title: 'Success',
      });

      if (method === 'post') {
        this.props.reset();
      }
    } else {
      this.setState({
        show: true,
        message: 'Error while creating new transaction',
        title: 'Error',
      });
    }
  } catch (error) {
    this.setState({
      show: true,
      message: 'Error while creating new transaction',
      title: 'Error',
    });
  }
}

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      message: '',
      title: '',
    };
  }

  setShow(show) {
    this.setState({
      show,
    });
  }

  getTitle() {
    return isEmpty(this.props.initialValues) ? 'Add transaction' : 'Edit transaction';
  }

  render() {
    return (
      <div className="transaction-form">
        <Toast
          title={this.state.title}
          show={this.state.show}
          setShow={this.setShow.bind(this)}
          message={this.state.message}
          data-test="transaction-form-toast"
        />

        <Card bg="light">
          <Card.Body>
            <Card.Title>{this.getTitle()}</Card.Title>
            <div className="container">
              <Form>
                <div className="row form-group">
                  <div className="col-md-2">
                    <Field
                      name="category"
                      label="Category"
                      component={renderInput}
                    />
                  </div>
                  <div className="col-md-5">
                    <Field
                      label="Amount"
                      name="amount"
                      placeholder="$0.00"
                      type="text"
                      component={renderInput}
                    />
                  </div>
                  <div className="col-md-5">
                    <Field
                      label="Date"
                      name="date"
                      component={renderInput}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Field
                      label="Description"
                      name="description"
                      component={renderInput}
                    />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <Button onClick={this.props.handleSubmit(onSubmit.bind(this))} className="submit-btn" variant="primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps)(reduxForm({
  form: 'newTransaction',
  validate,
})(TransactionForm));