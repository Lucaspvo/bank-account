import React from 'react';
import {Toast as ToastBootstrap} from "react-bootstrap";

class Toast extends React.Component {
  render() {
    return (
      <ToastBootstrap
        className="error-toast"
        onClose={() => this.props.setShow(false)}
        show={this.props.show}
        delay={3000}
        autohide
      >
        <ToastBootstrap.Header>
          <strong className="mr-auto">Error</strong>
        </ToastBootstrap.Header>
        <ToastBootstrap.Body>{this.props.message}</ToastBootstrap.Body>
      </ToastBootstrap>
    );
  }
}

export default Toast;