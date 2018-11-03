import React, { Component } from 'react'; 

class Header extends Component {
  render() {
    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-12">
            <h1>MultiSig Wallet Dapp</h1>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
