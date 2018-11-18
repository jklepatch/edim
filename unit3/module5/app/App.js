import React, { Component } from 'react';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import { web3, wallet } from './ethereum';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {accounts: []};
  }

  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    this.setState({accounts});
    console.log(this.state.accounts);
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
