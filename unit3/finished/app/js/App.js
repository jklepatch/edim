import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './layout/Header';
import Main from './layout/Main';
import Footer from './layout/Footer';
import Loading from './components/Loading';
//import { web3, wallet } from './ethereum';
import config from './config';
import Api from './api';


class App extends Component {
  constructor(props) {
    super(props);
    this.api = new Api(props.web3, props.wallet);
    this.state = {
      isReady: false,
      accounts: [],
      message: undefined,
      transfers: []
    };
    this.createTransfer = this.createTransfer.bind(this);
  }

  async componentDidMount() {
    const { web3, wallet } = this.props;
    const accounts = await this.api.getAccounts();
    this.api.accounts = accounts;
    const transfers = await this.api.getTransfers();
    this.setState({
      isReady: true,
      accounts,
      transfers
    });
  }

  async createTransfer(params) {
    const receipt = await this.api.createTransfer(params);
    console.log(receipt);
  }

  async sendTransfer() {
  }
   
  //onSendTransaction = (e, id) => {
  //  e.preventDefault();

  //  this.setState({
  //    isReady: false
  //  });

  //  await api.sendTransaction(id);

  //  this.setState({
  //    isReady: true,
  //    isMessage: true,
  //    message: {
  //      type: 'success', 
  //      payload: `transaction ${id} was sent`
  //    };
  //  });

  //  this.setTimeout(api.getTransactions, config.TIMEOUT);
  //}

  //onDismissMessage = () => {
  //  this.setState({
  //    message: undefined
  //  });
  //}

  render() {
    const { isReady, accounts, message, transfers } = this.state;
    console.log(this.state);
    if(!isReady) {
      return <Loading />
    }

    return (
      <Fragment>
        <Header
          message={message}
          onDismissMessage={this.onDismissMessage}
        />
        <Main
          transfers={transfers}
          createTransfer={this.createTransfer}
          sendTransfer={this.sendTransfer}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
