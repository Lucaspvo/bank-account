import './App.css';
import {Switch, Route, Redirect} from "react-router-dom";
import TopNavBar from './components/nav-bars/top-nav-bar.js';
import SideNavBar from './components/nav-bars/side-nav-bar.js';
import TransactionsList from './components/accounts/transactions/transactions-list.js';

function App() {
  return (
  <div>
    <TopNavBar/>
    <div className="side-bar-and-content">
      <SideNavBar/>
      <Switch>
        <Route path="/accounts/transactions">
          <TransactionsList/>
        </Route>
        <Route path="/">
          <Redirect to="/accounts/transactions"/>
        </Route>
      </Switch>
    </div>
  </div>
  );
}

export default App;
