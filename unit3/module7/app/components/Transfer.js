import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Transfer extends Component {
  render() {
    const { transfer } = this.props;

    return (
      <Fragment>
        <td>{transfer.id}</td>
        <td>{transfer.amount}</td>
        <td>{transfer.to}</td>
        <td>{transfer.approvals}</td>
        <td>{transfer.sent ? 'Yes' : 'No'}</td>
      </Fragment>
    );
  }
};

Transfer.propTypes = {
  transfer: PropTypes.object.isRequired,
};

export default Transfer;
