import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Transfer from './Transfer';

class Transfers extends Component {
  constructor(props) {
    super(props);
    this.renderTransfers = this.renderTransfers.bind(this);
  }

  renderTransfers() {
    const { transfers, onSendTransfer } = this.props;

    return (
      <table>
        <thead>
          <th>
            <td>Id</td>
            <td>From</td>
            <td>Amount</td>
            <td>Sent</td>
            <td>Action</td>
            <td>Ethereum Tx</td>
          </th>
        </thead>
        <tbody>
        {transfers.map((transfer) => 
          <Transfer 
            transfer={transfer}
            onSendTransfer={onSendTransfer}
          />)}
        </tbody>
      </table>
    );
  }

  render() {
    const { transfers } = this.props;

    return (
      <div id="transfers" className="card">
        <h2 className="card-title">Transfers</h2>
        {transfers.length > 0 ? this.renderTransfers() : 'No transfer'}
      </div>
    );
  }
}

Transfers.propTypes = {
  transfers: PropTypes.array.isRequired,
  onSendTransfer: PropTypes.func.isRequired,
};

export default Transfers;
