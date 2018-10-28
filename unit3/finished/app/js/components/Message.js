import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Alert } from 'react-bootstrap';

class Message extends Component {
  render() {
    const { message, onDismiss } = this.props;

    if(typeof message === 'undefined') {
      return null;
    }

    return (
      <Alert
        payload={message.payload}
        type={message.type}
        close={onDismiss}
      />
    );
  }
};

Message.propTypes = {
  message: PropTypes.object,
  onDismiss: PropTypes.func.isRequired
};

export default Message;
