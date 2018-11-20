import PropTypes from 'prop-types';
import React, { Component } from 'react'; 
import Dropdown from '../components/Dropdown';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  formatAccount(account, i) {
    return `(${i}) ${account && account.slice(0, 8)}...`;
  }

  renderAccounts() {
    const { accounts, activeAccount, selectAccount } = this.props;

    return (
      <Dropdown 
        items={accounts.map((account, i) => ({
          label: this.formatAccount(account, i),
          value: account
        }))} 
        activeItem={{
          label: this.formatAccount(activeAccount, accounts.indexOf(activeAccount)), 
          value: activeAccount
        }}
        onSelect={selectAccount}
      />
    );
  }

  renderTokens() {
    const { tokens, activeToken, selectToken } = this.props;

    return (
      <Dropdown 
        className="ml-3"
        items={tokens.map((token, i) => ({
          label: token.symbol,
          value: token
        }))} 
        activeItem={{
          label: activeToken.symbol,
          value: activeToken
        }}
        onSelect={selectToken}
      />
    );
  }

  render() {
    const { dex } = this.props;

    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-3 flex">
            {this.renderAccounts()}
            {this.renderTokens()}
          </div>
          <div className="col-sm-9">
            <h1>
              DimDex - <span className="contract-address">Contract address: <span className="address">{dex.options.address}</span></span>
            </h1>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  dex: PropTypes.object,
  accounts: PropTypes.array,
  activeAccount: PropTypes.string,
  selectAccount: PropTypes.func.isRequired,
  tokens: PropTypes.array,
  activeToken: PropTypes.object,
  selectToken: PropTypes.func.isRequired,
};

export default Header;
