
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";

import {routesAdmin} from "~/config";
import CreateNewType from "./components/CreateNewType";
import AllTypeProduct from "./components/AllTypeProduct";

import classNames from "classnames/bind";
import styles from "./Feature.module.scss";
import CreateInfoFilter from "./components/CreateInfoFilter";
import FilterMenu from "./components/FilterMenu";
import CreateCategory from "./components/CreateCategory";
import AllCategory from "./components/AllCategory";
const cx = classNames.bind(styles);

const DataFilterProduct = () => {
  return (
    <div className={cx("wrapper")}>
      <h4 className={cx("heading")}>
       <Link to={routesAdmin.listProduct}> <ArrowBackOutlined/> <span>Back</span></Link>
        Update detail product
      </h4>
      <div className={cx("inner")}>
        <AllCategory />
        <CreateCategory />
        <FilterMenu />
        <CreateInfoFilter />

        <AllTypeProduct />

        <CreateNewType />

      </div>
    </div>
  );
};

export default DataFilterProduct;
