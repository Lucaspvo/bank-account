import React from 'react';
import './side-nav-bar.css';

class SideNavBar extends React.Component {
  render() {
    return (
      <div className="side-nav-bar-section">
        <div className="inner-side-nav-bar">
          <div className="transactions-tab">
            <label>Transactions</label>
          </div>
        </div>
      </div>
    );
  }
}

export default SideNavBar;