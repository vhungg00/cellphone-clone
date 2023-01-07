import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AllOrder from './components/AllOrder/AllOrder';
import PenddingOrder from './components/PenddingOrder/PenddingOrder'
import ShippingOrder from './components/ShippingOrder/ShippingOrder'
import PaidOrder from './components/PaidOrder/PaidOrder'

function RoutesOrder(props) {
    return (
        <Routes>
            <Route path='/myOrder/' exact component={AllOrder}/>
            <Route path='/myOrder/pendding' component={PenddingOrder} />
            <Route path='/myOrder/shipping' component={ShippingOrder} />
            <Route path='/myOrder/paid' component={PaidOrder} />
        </Routes>
    );
}

export default RoutesOrder;