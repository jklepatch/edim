import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import Message from '../components/Message';

class Header extends Component {
  render() {
    const { message, onDismissMessage } = this.props;

    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-12">
            <h1>MultiSig Wallet Dapp</h1>
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
  onDismissMessage: PropTypes.func.isRequired
};

export default Header;
