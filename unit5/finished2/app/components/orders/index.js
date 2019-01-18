import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderList from './OrderList';
import NewOrder from './NewOrder';

class Orders extends Component {
  render() {
    const { orders } = this.props;
    return (
      <div id="orders">
        <NewOrder 
          addLimitOrder={this.props.addLimitOrder}
          addMarketOrder={this.props.addMarketOrder}
        />
        <OrderList 
          orders={orders}
        />
      </div>
    );
  }
}

Orders.propTypes = {
  addLimitOrder: PropTypes.func.isRequired,
  addMarketOrder: PropTypes.func.isRequired,
  orders: PropTypes.object
}

export default Orders;
