import { message } from "antd";
import { useEffect } from "react";

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import {routes, routesAdmin} from '~/config';
import Admin from "~/pages/Admin";
import AdminLayout from "~/layouts/AdminLayout";
import Home from '~/pages/Home';

import CartPage from "~/pages/CartPage";
import Category from '~/pages/Category';
import Login from '~/pages/Login';

import ProductList from "~/components/Admin/ProductList";
import DetailProductPage from '~/pages/DetailProductPage';

import AllProduct from "~/components/AllProduct";
import OrderPage from "~/pages/OrderPage";

import AdminCreate from "~/components/Admin/components/AdminProduct/components/AdminCreate";
import AdminUpdate from "~/components/Admin/components/AdminProduct/components/AdminUpdate";
import DataFilterProduct from "~/components/Admin/components/AdminProduct/DataFilterProduct";
import { OrderMain } from "~/components/Admin/pages/Order";
import OrderDetailmain from "~/components/Admin/pages/Order/OrderDetailmain";
import NotFound from "~/pages/NotFound";
import OrderScreen from "~/pages/OrderPage/OrderScreen";
import PaymentPage from "~/pages/PaymentPage";
import PlaceOrderPage from "~/pages/PlaceOrderPage";
import ProfilePage from "~/pages/ProfilePage";
import Register from "~/pages/Register";
import ShippingPage from "~/pages/ShippingPage";
import AdSlider from "~/components/Admin/components/AdminSlider/AdSlider";

const PrivateRoute = ({type = 0, children}) =>  {
    const { data: authUser } = useSelector(state => state.auth.user);

    if(!authUser) {
        return <Navigate to={routes.login} replace />
    }
    
    if( type ===1 & authUser?.admin) {
        return
    }

    // eslint-disable-next-line no-unused-vars
    return authUser?.token ? children : <Navigate to="/login" />;
};


const PrivateRoutes = ({type = 0}) =>  {
    const { data: authUser } = useSelector(state => state.auth.user);

    if(!authUser) {
        return <Navigate to={routes.login} replace />;
    }
    
    if( type ===1 & authUser?.admin) {
        return <Navigate to={routesAdmin.home} replace/>;
    }

    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    )

};

const clientRoutes = [
    { id: 1, path: routes.home, component: Home },
    { id: 1, path: routes.register, component: Register },
    { id: 3, path: routes.category, component: Category },
    { id: 4, path: routes.productDetail, component: DetailProductPage },
    { id: 5, path: routes.login, component: Login },
    { id: 6, path: routes.cart, component: CartPage },
    { id: 7, path: routes.order, component: OrderPage, privateRoute: PrivateRoute},
    { id: 7, path: routes.shipping, component: ShippingPage, privateRoute: PrivateRoute},
    { id: 8, path: routes.allProduct, component: AllProduct},
    { id: 9, path: routes.payment, component: PaymentPage, privateRoute: PrivateRoute},
    { id: 10, path: routes.placeorder, component: PlaceOrderPage, privateRoute: PrivateRoute},
    { id: 11, path: routes.orderId, component: OrderScreen, privateRoute: PrivateRoute},
    { id: 12, path: routes.profile, component: ProfilePage, privateRoute: PrivateRoute},
    { id: 13, path: routes.notFound, component: NotFound},
]

const adminRoutes = [           
    // { id: 1, path: routesAdmin.home, component: Admin, privateRoute: PrivateRoute},
    { id: 3, path: routesAdmin.listProduct, component: ProductList, privateRoute: PrivateRoute},
    { id: 4, path: routesAdmin.infoPrd, component: DataFilterProduct, privateRoute: PrivateRoute},
    { id: 5, path: routesAdmin.create, component: AdminCreate, privateRoute: PrivateRoute},
    { id: 6, path: routesAdmin.order, component: OrderMain, privateRoute: PrivateRoute},
    { id: 7, path: routesAdmin.orderDetail, component: OrderDetailmain, privateRoute: PrivateRoute},
    // { id: 8, path: routesAdmin.appChat, component: AppChat, privateRoute: PrivateRoute},
    { id: 9, path: routesAdmin.slider, component: AdSlider, privateRoute: PrivateRoute},

    { id: 10, path: routes.notFound, component: NotFound, privateRoute: PrivateRoute},
    { id: 11, path: routesAdmin.update, component: AdminUpdate, privateRoute: PrivateRoute},
]
export { clientRoutes, adminRoutes, PrivateRoutes };

