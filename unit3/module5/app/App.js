import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { web3, wallet } from './ethereum';

class App extends Component {
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    const result = wallet.methods.createTransfer().call();
    console.log(result);
  }

  render() {
    return (
      <div id="app">
        <Header wallet={wallet}/>
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
