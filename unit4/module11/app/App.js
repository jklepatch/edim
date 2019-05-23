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
    }
  };

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const activeAccount = accounts[0];
    this.setState({
      user: {
        accounts
      },
      selection: {
        account: activeAccount
      }
    });
  }
  
  selectAccount = async (account) => {
    this.setState({
      selection: { ...this.state.selection, account},
    });
  }

  render() {
    const { user, selection } = this.state;

    return (
      <div id="app">
        <Header 
          contracts={contracts}
          user={user}
          selection={selection}
          selectAccount={this.selectAccount}
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
