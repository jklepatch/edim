import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewTransfer extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { createTransfer } =  this.props;
    createTransfer(e.target.elements[0].value, e.target.elements[1].value);
  }

  render() {
    return (
      <div id="new-transfer" className="card">
        <h2 className="card-title">New Transfer</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label htmlFor="amount" className="col-sm-4 col-form-label">Amount</label>
            <div className="col-sm-8">
              <div className="input-group mb-3">
                <input id="amount" type="text" className="form-control" />
                <div className="input-group-append">
                  <span className="input-group-text">WEI</span>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="to" className="col-sm-4 col-form-label">To</label>
            <div className="col-sm-8">
              <input id="to" type="text" className="form-control" />
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

NewTransfer.propTypes = {
  createTransfer: PropTypes.func.isRequired
};

export default NewTransfer;
