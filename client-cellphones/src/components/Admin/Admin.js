import React from "react";
import { useSelector } from "react-redux";
import "./Admin.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from './components/sidebar/Sidebar'
import Routex from './components/Routes'
import Dashboard from "./pages/Dashboard";

function Admin(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;

  return (
          <div className="layout">
            <Sidebar />
            <div className="layout__content">

              <div className="layout__content-main">
                <Routex />
              </div>
            </div>
          </div>
  );
}

export default Admin;
