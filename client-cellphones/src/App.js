import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { adminRoutes, clientRoutes, PrivateRoutes } from "./routes/Routes";

import ResetScroll from "./components/ResetScroll";
import DefaultLayout from "./layouts";
import AdminLayout from "./layouts/AdminLayout";
import { routesAdmin } from '~/config';

import "./App.css";
import { getAllOrders } from "./appRedux/actions/orderAction";
import { getAllProductAdmin } from "./appRedux/actions/productAction";

import Admin from "~/pages/Admin";

function App() {
  const { data: authUser } = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = () => {
      if (authUser && authUser?.isAdmin) {
        dispatch(getAllProductAdmin())
        dispatch(getAllOrders());
      }
    }
    fetchApi();
  }, [dispatch, authUser])
  return (
    <Router>
      <ResetScroll />
      <div>
        <Routes>

          {/* Admin router */}

          <Route element={<PrivateRoutes type={1} />}>
            <Route path={routesAdmin.home} element={<Admin />} />
          </Route>


          {authUser?.isAdmin ? adminRoutes.map((route, id) => {
            const LayoutAdmin = AdminLayout;
            let Page = route.component;
            return (
              <Route
                key={id}
                path={route.path}
                element={
                  <LayoutAdmin>
                    <Page />
                  </LayoutAdmin>
                }
              />
            )
          }) : ''}
          {clientRoutes.map((route) => {
            const Page = route.component;
            let Layout = DefaultLayout;
            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }
            const PrivateRoute = route.privateRoute;
            return (
              <Route
                key={route.id}
                path={route.path}
                element={
                  <Layout>
                    {PrivateRoute ? (
                      <PrivateRoute>
                        <Page />
                      </PrivateRoute>
                    ) : (
                      <Page />
                    )}
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
