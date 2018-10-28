import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.renderSendTransfer = this.renderSendTransfer.bind(this);
  }

  NA() {
    return <span>N/A</span>;
  }

  renderSendTransfer() {
    const { transfer, onSendTransfer } = this.props;

    if(transfer.sent) {
      return this.NA();
    }

    return (
      <Button
        onClick={(e) => onSendTransfer.bind(null, e, transfer.id)}
      />
    );
  }

  renderTransferEthId() {
  //  const { transfer } = this.props;

  //  if(!transfer.sent) {
  //    return this.NA();
  //  }

  //  return (
  //    <a 
  //      href={`https://etherscan.com/tx/${transfer.id}`}
  //      title={`Link to transfer ${transaction.ethId}`}
  //    >Etherscan link</a>
  //  );
    return null;
  }
  
  render() {
    const { transfer } = this.props;

    return (
      <tr>
        <td>{transfer.id}</td>
        <td>{transfer.from}</td>
        <td>{transfer.amount}</td>
        <td>{transfer.sent}</td>
        <td>{this.renderSendTransfer()}</td>
        {/*<td>{this.renderTransferEthId()}</td>*/}
      </tr>
    );
  }
};

Transfer.propTypes = {
  transfer: PropTypes.object.isRequired,
  onSendTransfer: PropTypes.func.isRequired
};

export default Transfer;
