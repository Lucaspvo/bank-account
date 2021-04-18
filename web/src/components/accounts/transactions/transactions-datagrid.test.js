import React from 'react';
import TransactionsDatagrid from './transactions-datagrid';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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

const COLUMN_HEADERS = ['category', 'amount', 'description', 'date'];

describe('Transactions Datagrid', () => {
  it('should display the datagrid', () => {
    const wrapper = shallow(<TransactionsDatagrid transactions={EXPECTED}/>);
    const datagrid = wrapper.find('[data-test="transactions-datagrid"]');
    expect(datagrid.exists()).toBeTruthy();
  });

  COLUMN_HEADERS.forEach((header, index) => {
    it(`should display ${header.toUpperCase()} header`, () => {
      const wrapper = shallow(<TransactionsDatagrid transactions={EXPECTED}/>);
      const datagridHeaders = wrapper.find('[data-test="datagrid-headers"]');
      const columnHeader = datagridHeaders.find('tr th').at(index);
      expect(columnHeader.exists()).toBeTruthy();
      expect(columnHeader.text().toLowerCase()).toEqual(header);
    });
  });

  it('should display correct number of columns for transactions', () => {
    const wrapper = shallow(<TransactionsDatagrid transactions={EXPECTED}/>);
    const columns = wrapper.find('[data-test="datagrid-body"] tr');
    expect(columns.length).toEqual(EXPECTED.length);
  });
});
