import React from 'react';
import './top-nav-bar.css';

class TopNavBar extends React.Component {
  render() {
    return (
      <div className="top-nav-bar-section">
        <div className="inner-top-nav-bar">
          <div className="logo">
            <label>Estateably</label>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNavBar;