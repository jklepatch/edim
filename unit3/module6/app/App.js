import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { web3, wallet } from './ethereum';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {accounts: []};
    this.createTransfer = this.createTransfer.bind(this);
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({accounts});
  }

  async createTransfer(amount, to) {
    const receipt = await wallet.methods
      .createTransfer(amount, to)
      .send({from: this.state.accounts[0], gas: 200000});
    console.log(receipt);
  }

  render() {
    return (
      <div id="app">
        <Header wallet={wallet}/>
        <Main createTransfer={this.createTransfer} />
        <Footer />
      </div>
    );
  }
}

export default App;
