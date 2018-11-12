import React, { Component } from 'react'; 

class Header extends Component {
  render() {
    const { wallet } = this.props;
    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-12">
            <h1>
              MultiSig Wallet Dapp - <span className="contract-address">Contract address: <span className="address">{wallet.options.address}</span></span>
            </h1>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  wallet: PropTypes.func.isRequired
};

export default Header;
