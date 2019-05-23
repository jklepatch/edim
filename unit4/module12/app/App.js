import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { web3, contracts } from './ethereum';

class App extends Component {
  state = {
    user: {
      accounts: [], 
    },
    selection: {
      account: '',
      token: {}
    },
    tokens: []
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const rawTokens = await contracts.dex.methods.getTokens().call();
    const tokens = rawTokens.map(token => (
      {...token, symbol: web3.utils.hexToUtf8(token.symbol)};
    ));
    const activeAccount = accounts[0];
    const activeToken = tokens[0];
    this.setState({
      user: {
        accounts
      },
      selection: {
        account: activeAccount,
        token: activeToken
      },
      tokens
    });
  }
  
  selectAccount = async (account) => {
    this.setState({
      selection: { ...this.state.selection, account}
    });
  }


  selectToken = async (token) => {
    this.setState({
      selection: { ...this.state.selection, token}
    });
  }

  render() {
    const { user, selection, tokens } = this.state;

    return (
      <div id="app">
        <Header 
          contracts={contracts}
          tokens={tokens}
          user={user}
          selection={selection}
          selectAccount={this.selectAccount}
          selectToken={this.selectToken}
        />
        <main className="container-fluid">
          <div className="row">
            <div className="col-sm-4 first-col">
              <p>@Todo: NewOrder + Wallet</p>
            </div>
            <div className="col-sm-8">
              <p>@Todo: Orderbook + Trades</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
