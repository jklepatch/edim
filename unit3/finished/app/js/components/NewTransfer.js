import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input} from 'react-bootstrap';

class NewTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: undefined,
      to: undefined
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onAmountChanged = this.onAmountChanged.bind(this);
    this.onToChanged = this.onToChanged.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { createTransfer } =  this.props;
    createTransfer(this.state);
  }

  onAmountChanged(e) {
    this.setState({amount: e.target.value});
  }

  onToChanged(e) {
    this.setState({to: e.target.value});
  }

  render() {
    return (
      <div id="new-transfer" className="card">
        <h2>New Transfer</h2>
        <form onSubmit={this.onSubmit}>
          <div class="form-group row">
            <label for="amount" class="col-sm-4 col-form-label">Amount</label>
            <div class="col-sm-8">
              <div class="input-group mb-3">
                <input id="amount" type="text" class="form-control" onChange={this.onAmountChanged}/>
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="to" class="col-sm-4 col-form-label">To</label>
            <div class="col-sm-8">
              <input id="to" type="text" class="form-control" onChange={this.onToChanged}/>
            </div>
          </div>
          <div className="text-right">
            <button type="submit" class="btn btn-primary">Submit</button>
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
