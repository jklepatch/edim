import PropTypes from 'prop-types';
import React, { Component } from 'react'; 
import Wallet from '../components/Wallet';
import Orders from '../components/Orders';
import Market from '../components/Market';

class Main extends Component {

  render() {
    const { user, selection, activeToken } = this.props;

    return (
      <main className="container-fluid">
        <div className="row">
          <div className="col-sm-4 first-col">
            <Wallet 
              activeToken={activeToken} 
              selection={selection}
              user={user}
            />
          </div>
          <div className="col-sm-4">
            <Orders />
          </div>
          <div className="col-sm-4">
            <Market />
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  activeToken: PropTypes.object,
  user: PropTypes.object
};

export default Main;
