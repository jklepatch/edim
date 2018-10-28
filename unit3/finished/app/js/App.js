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
  }

  async componentDidMount() {
    const { web3, wallet } = this.props;
    const accounts = await this.api.getAccounts();
    const transfers = await this.api.getTransfers();
    this.setState({
      isReady: true,
      accounts,
      transfers
    });
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

  //componentDidMount = () => {
  //  const transactions = await api.getTransactions();
  //  const accounts = await api.getAccounts();

  //  this.setState({
  //    accounts,
  //    transactions
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
          onSendTransaction={this.onSendTransaction}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
