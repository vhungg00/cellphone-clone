import { message } from "antd";
import { useEffect } from "react";

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import config from '~/config';
import Admin from "~/pages/Admin";
import Home from '~/pages/Home';

import CartPage from "~/pages/CartPage";
import Category from '~/pages/Category';
import Login from '~/pages/Login';

import ProductList from "~/components/Admin/ProductList";
import DetailProductPage from '~/pages/DetailProductPage';

import AllProduct from "~/components/AllProduct";
import OrderPage from "~/pages/OrderPage";

import AdminCreate from "~/components/Admin/components/AdminProduct/components/AdminCreate";
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

const PrivateRoute = ({children}) =>  {
    const { data: authUser } = useSelector(state => state.auth.user);
    // eslint-disable-next-line no-unused-vars
    useEffect(() => { !authUser?.token && message.info('Vui lòng đăng nhập để sử dụng tác vụ tiếp theo')}, [authUser])
    return authUser?.token ? children : <Navigate to="/login" />;
};

const clientRoutes = [
    { id: 1, path: config.routes.home, component: Home },
    { id: 1, path: config.routes.register, component: Register },
    { id: 3, path: config.routes.category, component: Category },
    { id: 4, path: config.routes.productDetail, component: DetailProductPage },
    { id: 5, path: config.routes.login, component: Login },
    { id: 6, path: config.routes.cart, component: CartPage },
    { id: 7, path: config.routes.order, component: OrderPage, privateRoute: PrivateRoute},
    { id: 7, path: config.routes.shipping, component: ShippingPage, privateRoute: PrivateRoute},
    { id: 8, path: config.routes.allProduct, component: AllProduct},
    { id: 9, path: config.routes.payment, component: PaymentPage, privateRoute: PrivateRoute},
    { id: 10, path: config.routes.placeorder, component: PlaceOrderPage, privateRoute: PrivateRoute},
    { id: 11, path: config.routes.orderId, component: OrderScreen, privateRoute: PrivateRoute},
    { id: 12, path: config.routes.profile, component: ProfilePage, privateRoute: PrivateRoute},
    { id: 13, path: config.routes.notFound, component: NotFound},
]

const adminRoutes = [           
    { id: 1, path: config.routesAdmin.home, component: Admin, privateRoute: PrivateRoute},
    { id: 3, path: config.routesAdmin.listProduct, component: ProductList, privateRoute: PrivateRoute},
    { id: 4, path: config.routesAdmin.infoPrd, component: DataFilterProduct, privateRoute: PrivateRoute},
    { id: 5, path: config.routesAdmin.create, component: AdminCreate, privateRoute: PrivateRoute},
    { id: 6, path: config.routesAdmin.order, component: OrderMain, privateRoute: PrivateRoute},
    { id: 7, path: config.routesAdmin.orderDetail, component: OrderDetailmain, privateRoute: PrivateRoute},
    // { id: 8, path: config.routesAdmin.appChat, component: AppChat, privateRoute: PrivateRoute},
    { id: 9, path: config.routes.notFound, component: NotFound, privateRoute: PrivateRoute},
]
export { clientRoutes, adminRoutes };

