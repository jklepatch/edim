import PropTypes from 'prop-types';
import React, { Component } from 'react'; 
import NewTransfer from '../components/NewTransfer';

class Main extends Component {
  render() {
    const { createTransfer } = this.props;
    return (
      <main className="container-fluid">
        <div className="row">
          <NewTransfer createTransfer={createTransfer} />
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  createTransfer: PropTypes.func.isRequired
};

export default Main;
