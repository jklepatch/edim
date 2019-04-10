import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { web3, contracts } from './ethereum';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Header 
          contracts={contracts}
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
