import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { web3, dex } from './ethereum';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [], 
      tokens: [],
      activeAccount: '',
      activeToken: {symbol: '', address: ''},
    };
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const rawTokens = await dex.methods.getTokens().call();
    const tokens = [];
    for(let i = 0; i < rawTokens[0].length; i++) {
      tokens.push({
        id: i,
        symbol: web3.utils.toAscii(rawTokens[0][i]),
        address: rawTokens[1][i]
      });
    }
    this.setState({
      accounts,
      tokens,
      activeAccount: accounts[0],
      activeToken: tokens[0] 
    });
  }

  selectAccount(account) {
    this.setState({activeAccount: account});
  }

  selectToken(token) {
    this.setState({activeToken: token}); 
  }

  async createTransfer(amount, to) {
    const receipt = await wallet.methods
      .createTransfer(amount, to)
      .send({from: this.state.accounts[0], gas: 200000});
    console.log(receipt);
  }

  render() {
    const { accounts, activeAccount, tokens, activeToken } = this.state;

    return (
      <div id="app">
        <Header 
          dex={dex}
          accounts={accounts}
          activeAccount={activeAccount}
          selectAccount={this.selectAccount.bind(this)}
          tokens={tokens}
          activeToken={activeToken}
          selectToken={this.selectToken.bind(this)}
        />
        <Main 
          activeToken={activeToken}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
