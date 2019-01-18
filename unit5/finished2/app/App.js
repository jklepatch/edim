import React, { Component } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Wallet from './components/Wallet';
import Orders from './components/orders';
import Market from './components/Market';
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
      orders: {
        buy: [],
        sell: []
      }
    };
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
    const activeAccount = accounts[4];
    const activeToken = tokens[0];
    const balances = await this.refreshBalances(activeAccount, activeToken);
    const orders = await this.refreshOrders(activeToken);
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
      orders
    });
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

  async refreshOrders(token) {
    const orders = await contracts.dex.methods
      .getOrders(web3.utils.fromAscii(token.symbol))
      .call();
    return {buy: orders[0], sell: orders[1]};
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
    const { selection, user } = this.state;
    const receipt = await contracts.dex.methods
      .deposit(amount, web3.utils.fromAscii(selection.token.symbol))
      .send({from: selection.account, gas: 200000});
    const balances = await this.refreshBalances(
      selection.account, 
      selection.token
    );
    this.setState({
      user: { ...user, balances},
    });
  }

  async withdraw(amount) {
    const { selection, user } = this.state;
    const receipt = await contracts.dex.methods
      .withdraw(
        amount, 
        web3.utils.fromAscii(selection.token.symbol), 
        selection.account
      )
      .send({from: selection.account, gas: 200000});
    const balances = await this.refreshBalances(
      selection.account, 
      selection.token
    );
    this.setState({
      user: { ...user, balances},
    });
  }

  async addMarketOrder(amount, price, side) {
    const { selection } = this.state;
    const receipt = await contracts.dex.methods
      .addMarketOrder(
        web3.utils.fromAscii(selection.token.symbol),
        amount,
        price,
        side
      )
      .send({from: selection.account, gas: 200000});
    const orders = await this.refreshOrders(selection.token);
    this.setState({
      order: { orders }
    });
  }

  async addLimitOrder(amount, price, side) {
    const { selection } = this.state;
    const receipt = await contracts.dex.methods
      .addLimitOrder(
        web3.utils.fromAscii(selection.token.symbol),
        amount,
        price,
        side
      )
      .send({from: selection.account, gas: 1000000});
    const orders = await this.refreshOrders(selection.token);
    this.setState({
      order: { orders }
    });
  }

  render() {
    const { tokens, user, selection, orders } = this.state;

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
        <main className="container-fluid">
          <div className="row">
            <div className="col-sm-4 first-col">
              <Wallet 
                selection={selection}
                user={user}
                deposit={this.deposit.bind(this)}
                withdraw={this.withdraw.bind(this)}
              />
            </div>
            <div className="col-sm-4">
              <Orders 
                addMarketOrder={this.addMarketOrder.bind(this)}
                addLimitOrder={this.addLimitOrder.bind(this)}
                orders={orders}
              />
            </div>
            <div className="col-sm-4">
              <Market />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
