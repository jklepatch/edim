import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import NewTransfer from '../components/NewTransfer';
import Transfers from '../components/Transfers';

class Main extends Component {
  render() {
    const { transfers, sendTransfer, createTransfer } = this.props;

    return (
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-4 first-col">
            <NewTransfer createTransfer={createTransfer} />
          </div>
          <div className="col-sm-8">
            <Transfers
              transfers={transfers}
              sendTransfer={sendTransfer}
            />
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  transactions: PropTypes.array.isRequired,
  createTransfer: PropTypes.func.isRequired,
  sendTransfer: PropTypes.func.isRequired
};

export default Main;
