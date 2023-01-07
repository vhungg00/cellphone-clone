import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import AdminProduct from './AdminProduct/AdminProduct';
import AdminCreate from './AdminProduct/AdminCreate'
import AdminUpdate from './AdminProduct/AdminUpdate'
import AdminOrder from './AdminOrder/AdminOrder'
import AdminUser from './AdminUser/AdminUser';
import AppChat from './AppChat/AppChat'
import ReviewProduct from './AdminProduct/ReviewProduct/ReviewProduct';
import DataFilterProduct from './AdminProduct/DataFilterProduct/DataFilterProduct';

function Routex(props) {
    return (
            <Routes>
                <Route path='/admin' exact element={<Dashboard />}/>
                <Route path='/customer' element={<AdminUser />}/>
    
                <Route path='/admin/product/create' element={<AdminCreate />}/>
                <Route path='/admin/product/update/info' element={<DataFilterProduct />}/>
                <Route path='/admin/product/update/:id' element={<AdminUpdate />}/>
                {/* <Route path='/' element={<ReviewProduct />}/> */}
                {/* <Route path='/' element={<AdminProduct />}/> */}
    
                {/* <Route path='/' element={<AdminOrder />}/> */}
                {/* <Route path='/' element={<AppChat />}/> */}
            </Routes>
    );
}

export default Routex;