import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import NewTransfer from '../components/NewTransfer';
import Transfers from '../components/Transfers';

class Main extends Component {
  render() {
    const { transfers, onSendTransaction, onCreateTransaction } = this.props;

    return (
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-4 first-col">
            <NewTransfer onSubmit={onCreateTransaction} />
          </div>
          <div className="col-sm-8">
            <Transfers
              transfers={transfers}
              onSendTransfer={onSendTransaction}
            />
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  transactions: PropTypes.array.isRequired,
  onSendTransaction: PropTypes.func.isRequired
};

export default Main;
