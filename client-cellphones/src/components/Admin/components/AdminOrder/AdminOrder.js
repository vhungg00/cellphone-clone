import React from "react";
import "./AdminOrder.css";
import AdminOrderMenu from "./AdminOrderMenu/AdminOrderMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminOrderAll from "./AdminOrderAll/AdminOrderAll";


function AdminOrder(props) {

  return (
    <Router>
      <div className="order">
        <span>Orders</span>
        <AdminOrderMenu></AdminOrderMenu>

        <Routes>
          <Route path="/admin/order" exact component={AdminOrderAll}>
          </Route>
         
        </Routes>
      </div>
    </Router>
  );
}

export default AdminOrder;
