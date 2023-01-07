import React from "react";
import { useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import Loading from "~/components/Loading";
import TopTotal from "~/components/Admin/pages/HomeAdmin/TopTotal";
import SaleStatistics from "~/components/Admin/pages/HomeAdmin/SalesStatistics";
import ProductsStatistics from "~/components/Admin/pages/HomeAdmin/ProductsStatistics";
import LatestOrder from "~/components/Admin/pages/HomeAdmin/LatestOrder";

const cx = classNames.bind(styles);

function Admin() {
    const orderListMy = useSelector((state) => state.order);
    const { isLoading, error, allOrder = [] } = orderListMy;
  const productList = useSelector((state) => state.product);
  const { allProductAdmin = [] } = productList;
  console.log('products: ', allProductAdmin);
  return (
    <section className={cx("wrapper", "container")}>
      {isLoading && <Loading />}
      <div className={cx("header")}>
        <h2 className={cx("title")}> Dashboard </h2>
      </div>
      {/* Top Total */}
      <TopTotal orders={allOrder} products={allProductAdmin} />

      {/* STATICS */}
      <div className="row">
        <SaleStatistics />
        <ProductsStatistics />
      </div>

      {/* LATEST ORDER */}
      <div className="card mb-4 shadow-sm">
        <LatestOrder orders={allOrder} loading={isLoading} error={error} />
      </div>
    </section>
  );
}

export default Admin;
