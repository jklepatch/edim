import PropTypes from 'prop-types';
import React, { Component } from 'react'; 

class Header extends Component {
  render() {
    const { contracts } = this.props;

    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-3 flex">
            <p>Todo...</p>
          </div>
          <div className="col-sm-9">
            <h1 className="header-title">
              DimDex - <span className="contract-address">Contract address: <span className="address">{contracts.dex.options.address}</span></span>
            </h1>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  contracts: PropTypes.object,
};

export default Header;
