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

  async componentDidMount() {
    const { dex } = contracts;
    const accounts = await web3.eth.getAccounts();
    const rawTokens = await dex.methods.getTokens().call();
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
    const tokenDex = await dex.methods
      .balanceOf(activeAccount, web3.utils.fromAscii(activeToken))
      .call();

    const tokenWallet = await contracts[activeToken.symbol].methods
      .balanceOf(activeAccount)
      .call();

    this.setState({
      tokens,
      user: {
        accounts,
        balances: {
          tokenDex,
          tokenWallet
        },
      },
      selection: {
        account: activeAccount,
        token: activeToken
      },
    });
  }

  selectAccount(account) {
    this.setState({
      selection: { ...this.state.selection, account}
    });
  }

  selectToken(token) {
    this.setState({
      selection: { ...this.state.selection, token}
    });
  }

  async createTransfer(amount, to) {
    const receipt = await wallet.methods
      .createTransfer(amount, to)
      .send({from: this.state.accounts[0], gas: 200000});
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
        />
        <Footer />
      </div>
    );
  }
}

export default App;
