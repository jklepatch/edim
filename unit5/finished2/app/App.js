import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { web3, contracts } from './ethereum';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      user: {
        accounts: [], 
        balances: {
          tokenDex: 0,
          tokenWallet: 0
        }
      },
      selection: {
        account: '',
        token: {}
      },
    };
  }

  async refreshBalances(account, token) {
    const tokenDex = await contracts.dex.methods
      .balanceOf(account, web3.utils.fromAscii(token.symbol))
      .call();
    const tokenWallet = await contracts[token.symbol].methods
      .balanceOf(account)
      .call();
    return {tokenDex, tokenWallet};
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const rawTokens = await contracts.dex.methods.getTokens().call();
    const tokens = [];
    for(let i = 0; i < rawTokens[0].length; i++) {
      tokens.push({
        id: i,
        symbol: web3.utils.hexToUtf8(rawTokens[0][i]),
        address: rawTokens[1][i]
      });
    }
    const activeAccount = accounts[3];
    const activeToken = tokens[0];
    const balances = await this.refreshBalances(activeAccount, activeToken);
    this.setState({
      tokens,
      user: {
        accounts,
        balances
      },
      selection: {
        account: activeAccount,
        token: activeToken
      },
    });
  }

  async selectAccount(account) {
    const balances = await this.refreshBalances(
      account, 
      this.state.selection.token
    );
    this.setState({
      selection: { ...this.state.selection, account},
      user: {...this.state.user, balances}
    });
  }

  async selectToken(token) {
    const balances = await this.refreshBalances(
      this.state.selection.account, 
      token
    );
    this.setState({
      selection: { ...this.state.selection, token},
      user: {...this.state.user, balances}
    });
  }

  async deposit(amount) {
    const { selection } = this.state;
    const receipt = await contracts.dex.methods
      .deposit(amount, web3.utils.fromAscii(selection.token.symbol))
      .send({from: selection.account, gas: 200000});
    console.log(receipt);
  }

  render() {
    const { tokens, user, selection } = this.state;

    return (
      <div id="app">
        <Header 
          contracts={contracts}
          tokens={tokens}
          user={user}
          selection={selection}
          selectAccount={this.selectAccount.bind(this)}
          selectToken={this.selectToken.bind(this)}
        />
        <Main 
          selection={selection}
          user={user}
          deposit={this.deposit.bind(this)}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
