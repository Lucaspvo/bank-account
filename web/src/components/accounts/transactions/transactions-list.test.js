import React from 'react';
import TransactionsList from './transactions-list';
import { shallow, configure } from 'enzyme';
import fetchMock from 'fetch-mock';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const corsHeaders = {
  "Access-Control-Allow-Methods": "PUT, OPTIONS, CONNECT, PATCH, GET, HEAD, POST, DELETE, TRACE",
  "Access-Control-Allow-Origin": "http://localhost:3030",
  "Access-Control-Expose-Headers": "link, etag, location",
  "Access-Control-Allow-Headers": "user-agent",
};

const EXPECTED = [
  {
    "amount": "$452.56",
    "description": "nostrud aute eu",
    "category": "house",
    "created_at": "2014-03-29T12:17:06+04:00",
    "updated_at": "2018-12-05T08:19:07+05:00"
  },
  {
    "amount": "$108.70",
    "description": "do magna sint",
    "category": "salary",
    "created_at": "2020-04-17T05:23:05+04:00",
    "updated_at": "2020-12-21T05:17:13+05:00"
  },
  {
    "amount": "$396.61",
    "description": "eu nulla exercitation",
    "category": "other",
    "created_at": "2018-05-18T05:24:19+04:00",
    "updated_at": "2014-12-08T01:54:35+05:00"
  },
  {
    "amount": "$801.50",
    "description": "do excepteur aliquip",
    "category": "transport",
    "created_at": "2020-04-21T08:34:20+04:00",
    "updated_at": "2018-02-06T06:13:28+05:00"
  },
  {
    "amount": "$252.10",
    "description": "duis enim amet",
    "category": "food",
    "created_at": "2020-02-06T08:15:12+05:00",
    "updated_at": "2016-02-02T10:26:38+05:00"
  },
];

const flushPromises = () => new Promise(setImmediate);

describe('Transactions List', () => {
  it('should display main component', async () => {
    fetchMock.get(
    'http://localhost:3030/accounts/1/transactions?',
    {body: EXPECTED, status: 200}
    );

    const wrapper = shallow(<TransactionsList />);
    await flushPromises();

    const component = wrapper.find('[data-test="transactions-list-section"]');
    expect(component.exists()).toBeTruthy();

    fetchMock.restore();
  });

  it('should request list of transactions on component render', async () => {
    fetchMock.get('http://localhost:3030/accounts/1/transactions?', EXPECTED);

    shallow(<TransactionsList />);
    await flushPromises();

    expect(fetchMock.called()).toBeTruthy();

    fetchMock.restore();
  });

  it('should display error toast for bad request', async () => {
    fetchMock.get('http://localhost:3030/accounts/1/transactions?', {status: 500});

    const wrapper = shallow(<TransactionsList />);
    await flushPromises();

    const toast = wrapper.find('[data-test="error-toast"]');

    expect(toast.exists()).toBeTruthy();

    fetchMock.restore();
  });

  it('should display alert of loading transactions', async () => {
    fetchMock.get('http://localhost:3030/accounts/1/transactions?', {body: [], status: 200});

    const wrapper = shallow(<TransactionsList />);

    const alert = wrapper.find('[data-test="no-data-div"]');
    expect(alert.exists()).toBeTruthy();

    const spinner = wrapper.find('[data-test="loading-spinner"]');
    expect(spinner.exists()).toBeTruthy();

    fetchMock.restore();
  });

  it('should display alert of no transactions found', async () => {
    fetchMock.get('http://localhost:3030/accounts/1/transactions?', {body: [], status: 200});

    const wrapper = shallow(<TransactionsList />);
    await flushPromises();

    const alert = wrapper.find('[data-test="no-data-div"]');
    expect(alert.exists()).toBeTruthy();
    expect(alert.text()).toBe('No transactions were found!');

    fetchMock.restore();
  });

  it('should display transactions datagrid', async () => {
    fetchMock.get(
    'http://localhost:3030/accounts/1/transactions?',
    {body: EXPECTED, status: 200}
    );

    const wrapper = shallow(<TransactionsList />);
    await flushPromises();

    const datagrid = wrapper.find('[data-test="transactions-datagrid"]');
    expect(datagrid.exists()).toBeTruthy();

    fetchMock.restore();
  });
});
