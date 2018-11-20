import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
    this.sendTransfer = this.sendTransfer.bind(this);
  }

  sendTransfer(e, id) {
    const { sendTransfer } = this.props;
    e.preventDefault();
    sendTransfer(id);
  }

  renderAction() {
    const { transfer, sendTransfer } = this.props;

    if(transfer.sent) {
      return <span>N/A</span>;
    }

    return (
      <a 
        className="btn btn-secondary" 
        href="#"
        onClick={(e) => this.sendTransfer(e, transfer.id)}
      >Send</a>
    );
  }

  render() {
    const { transfer } = this.props;

    return (
      <Fragment>
        <td>{transfer.id}</td>
        <td>{transfer.amount}</td>
        <td>{transfer.to}</td>
        <td>{transfer.approvals}</td>
        <td>{transfer.sent ? 'Yes' : 'No'}</td>
        <td>{this.renderAction()}</td>
      </Fragment>
    );
  }
};

Transfer.propTypes = {
  transfer: PropTypes.object.isRequired,
  sendTransfer: PropTypes.func.isRequired
};

export default Transfer;
