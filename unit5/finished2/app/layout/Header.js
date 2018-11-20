import PropTypes from 'prop-types';
import React, { Component } from 'react'; 
import { DropdownButton, MenuItem } from 'react-bootstrap';


class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderAccount(index, address) {
    return `(${index}) ${address && address.slice(0, 8)}...`;
  }

  renderAccounts() {
    const { accounts, activeAccount, selectAccount } = this.props;

    return (
      <DropdownButton
        title={this.renderAccount(activeAccount.index, activeAccount.address)}
        id='account-dropdown'
        onSelect={selectAccount}
      >
        {accounts.map((account, i) => (
          <MenuItem 
            key={i} 
            eventKey={i}
            active={activeAccount.address == account.address}
          >
            {this.renderAccount(i, account)}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }

  renderTokens() {
    const { tokens, activeToken, selectToken } = this.props;

    return (
      <DropdownButton
        title={activeToken.symbol}
        id='token-dropdown'
        onSelect={selectToken}
      >
        {tokens.map((token, i) => (
          <MenuItem 
            key={i} 
            eventKey={i}
            active={activeToken.symbol == token.symbol}
          >
            {token.symbol}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }

  render() {
    const { dex } = this.props;
    return (
      <header id="header" className="card">
        <div className="row">
          <div className="col-sm-3">
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
  activeAccount: PropTypes.object,
  selectAccount: PropTypes.func.isRequired,
  tokens: PropTypes.array,
  activeToken: PropTypes.object,
  selectToken: PropTypes.func.isRequired,
};

export default Header;
