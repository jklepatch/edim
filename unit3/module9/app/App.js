import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { web3, wallet } from './ethereum';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {accounts: [], transfers: []};
    this.createTransfer = this.createTransfer.bind(this);
    this.sendTransfer = this.sendTransfer.bind(this);
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const rawTransfers = await wallet.methods.getTransfers().call();
    const transfers = [];
    for(let i = 0; i < rawTransfers[0].length; i++) {
      transfers.push({
        id: rawTransfers[0][i],
        amount: rawTransfers[1][i],
        to: rawTransfers[2][i],
        approvals: rawTransfers[3][i],
        sent: rawTransfers[4][i],
      });
    }
    this.setState({
      accounts,
      transfers
    });
  }

  async createTransfer(amount, to) {
    const receipt = await wallet.methods
      .createTransfer(amount, to)
      .send({from: this.state.accounts[0], gas: 200000});
    console.log(receipt);
  }

  async sendTransfer(id) {
    console.log('sendTransfer');
    const receipt = await wallet.methods
      .sendTransfer(id)
      .send({from: this.state.accounts[0], gas: 200000});
    console.log(receipt);
  }

  render() {
    const { transfers } = this.state;

    return (
      <div id="app">
        <Header wallet={wallet}/>
        <Main 
          createTransfer={this.createTransfer} 
          sendTransfer={this.sendTransfer}
          transfers={transfers}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
