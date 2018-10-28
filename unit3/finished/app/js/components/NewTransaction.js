import react, { Component } from 'react';
import { Form, Input} from 'react-bootstrap';

class NewTransaction extends Component {
  render() {
    const { onSubmit } = this.props;

    <Form
      onSubmit={onSubmit}
    >
      <Input>To</Input>
      <Input>amount</Input>
      <Input type="submit"></Input>
    </Form>
  }
}

NewTransaction.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewTransaction;
