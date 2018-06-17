import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import {
  getDefaultState,
  //getWeb3, //@TODO: uncomment this, and remove getWeb3 above
  getWalletAddress,
  getContractInstances,
  getDimDexBalances,
  getWalletBalances,
} from './state.js';

import Header from './Header.js';
import Balances from './Balances.js';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = getDefaultState();
  }

  componentDidMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(({ web3 }) => {
      this.setState({web3});

      return getWalletAddress(web3);
    })
    .then((walletAddress) => {
      this.setState({walletAddress});

      return getContractInstances(this.state.web3);
    })
    .then((contracts) => {
      this.setState({contracts});
      return Promise.all([
        getDimDexBalances(contracts, this.state.walletAddress),
        getWalletBalances(contracts, this.state.walletAddress),
      ]);
    })
    .then(([dimDexBalanceResults, walletBalanceResults]) => {
      const balances = { 
        eos: {dimDex: dimDexBalanceResults.eos, wallet: walletBalanceResults.eos},
        omg: {dimDex: dimDexBalanceResults.omg, wallet: walletBalanceResults.omg}
      };

      this.setState({balances});
    })
    .catch((error) => {
      console.log(error);
    })
  }

  onTokenChanged(activeToken) {
    console.log("here");
    this.setState({activeToken});
  }


  render() {
    return (
      <div className="App container">
        <div className="row">
          <Header 
            activeToken={this.state.activeToken}
            onTokenChanged={this.onTokenChanged.bind(this)}/>
        </div>

        <main className="row">
          <div className="col-sm-4">
            Market here
          </div>
          <div className="col-sm-4">
            <Balances balances={this.state.balances}/>
          </div>
          <div className="col-sm-4">
            <p>The stored value is: {this.state.storageValue}</p>
            New Order
          </div>
        </main>
      </div>
    );
  }
}

export default App
