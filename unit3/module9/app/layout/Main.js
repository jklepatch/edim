import PropTypes from 'prop-types';
import React, { Component } from 'react'; 
import NewTransfer from '../components/NewTransfer';
import Transfers from '../components/Transfers';

class Main extends Component {
  render() {
    const { transfers, createTransfer, sendTransfer } = this.props;
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
  transfers: PropTypes.array,
  createTransfer: PropTypes.func.isRequired,
  sendTransfer: PropTypes.func.isRequired
};

export default Main;
