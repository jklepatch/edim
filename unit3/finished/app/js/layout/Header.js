import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import Message from '../components/Message';

class Header extends Component {
  render() {
    const { message, onDismissMessage, wallet } = this.props;

    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-12">
            <h1>MultiSig Wallet Dapp - <span className="contract-address">Contract address: <span className="address">{wallet.options.address}</span></span></h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <Message 
              message={message}
              onDismiss={onDismissMessage}
            />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  message: PropTypes.object,
  onDismissMessage: PropTypes.func.isRequired,
  wallet: PropTypes.func.isRequired
};

export default Header;
