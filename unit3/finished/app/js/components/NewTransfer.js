import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input} from 'react-bootstrap';

class NewTransfer extends Component {
  render() {
    const { onSubmit } = this.props;

    return (
      <div id="new-transfer" className="card">
        <h2>New Transfer</h2>
        <form>
          <div class="form-group row">
            <label for="amount" class="col-sm-4 col-form-label">Amount</label>
            <div class="col-sm-8">
              <div class="input-group mb-3">
                <input id="amount" type="text" class="form-control" />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="to" class="col-sm-4 col-form-label">To</label>
            <div class="col-sm-8">
              <input id="to" type="text" class="form-control" />
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
  onSubmit: PropTypes.func.isRequired
};

export default NewTransfer;
