import React, { Component } from 'react';
import PropTypes from 'prop-types';

const DIRECTION = {
  WIDTHDRAW: 'WIDTHDRAW',
  DEPOSIT: 'DEPOSIT'
};

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: DIRECTION.DEPOSIT
    }
  }

  onChange(e) {
    console.log(e);
  }

  onDirectionChange(direction) {
    this.setState({direction});
  }

  onSubmit() {
    console.log('send token');
  }

  render() {
    const { activeToken } = this.props;
    const { direction } = this.state;

    return (
      <div id="wallet" className="card">
        <h2 className="card-title">Wallet</h2>
        <h3>Token balance for {activeToken.symbol}</h3>
          <div className="form-group row">
            <label htmlFor="wallet" className="col-sm-4 col-form-label">Wallet</label>
            <div className="col-sm-8">
              <input className="form-control" id="wallet" disabled value="00000" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="contract" className="col-sm-4 col-form-label">Contract</label>
            <div className="col-sm-8">
              <input className="form-control" id="contract" disabled value="00000" />
            </div>
          </div>
        <h3>Transfer {activeToken.symbol}</h3>
        <form id="transfer" onSubmit={this.onSubmit} onChange={this.onChange}>
          <div className="form-group row">
            <label htmlFor="direction" className="col-sm-4 col-form-label">Direction</label>
            <div className="col-sm-8">
              <div id="direction" className="btn-group" role="group">
                <button 
                  type="button" 
                  className={`btn btn-secondary ${direction === DIRECTION.DEPOSIT ? 'active' : ''}`}
                  onClick={this.onDirectionChange.bind(this, DIRECTION.DEPOSIT)}
                >Deposit</button>
                <button 
                  type="button" 
                  className={`btn btn-secondary ${direction === DIRECTION.WIDTHDRAW ? 'active' : ''}`}
                  onClick={this.onDirectionChange.bind(this, DIRECTION.WIDTHDRAW)}
                >Withdraw</button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="amount" className="col-sm-4 col-form-label">Amount</label>
            <div className="col-sm-8">
              <div className="input-group mb-3">
                <input id="amount" type="text" className="form-control" />
                <div className="input-group-append">
                  <span className="input-group-text">{activeToken.symbol}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Wallet;
