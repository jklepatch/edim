import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Transfer extends Component {
  constructor(props) {
    super(props);
    this.renderAction = this.renderAction.bind(this);
  }

  NA() {
    return <span>N/A</span>;
  }

  renderAction() {
    const { transfer, sendTransfer } = this.props;

    if(transfer.sent) {
      return this.NA();
    }

    return (
      <a 
        className="btn btn-secondary" 
        href="#"
        onClick={(e) => e.preventDefault() && sendTransfer(transfer.id)}
      >Send</a>
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
        <td>{transfer.amount}</td>
        <td>{transfer.to}</td>
        <td>{transfer.sent ? 'Yes' : 'No'}</td>
        <td>{this.renderAction()}</td>
        {/*<td>{this.renderTransferEthId()}</td>*/}
      </tr>
    );
  }
};

Transfer.propTypes = {
  transfer: PropTypes.object.isRequired,
  sendTransfer: PropTypes.func.isRequired
};

export default Transfer;
