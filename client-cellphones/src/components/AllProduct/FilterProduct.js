import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Slider } from "antd";
import classNames from "classnames/bind";
import styles from "./Allproduct.module.scss";
import SortByPrice from "./SortByPrice";
import { filterProductByPrice, getAllProducts } from "~/appRedux/actions/productAction";
const cx = classNames.bind(styles);

function FilterProduct(props) {
  const dispatch = useDispatch();

  const [range, setRange] = useState([])
  const FilterProductByPrice = () => {
    
    let [a = 0, b =0] = range || [];
    a = parseInt(a);
    b = parseInt(b);
    const temp = { a,b }
    dispatch(filterProductByPrice(temp))
  };

  const onChange = () => {
    dispatch(getAllProducts())
  };

  const onAfterChange = (value) => {
    const [a, b] = value || [];
    value && setRange([a, b]);
  };
  return (
    <section className="filter_area">
      <div className="container">
        <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 gx-0">
          {/* <FilterMenu></FilterMenu> */}
        </div>
        <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 gx-0">
          <div className={cx("filter")}>
            <label>Phạm vi giá</label>
            <Slider
              range
              step={100000}
              defaultValue={[0, 50000000]}
              min={0}
              max={50000000}
              onChange={onChange}
              onAfterChange={onAfterChange}
            />
            <button onClick={FilterProductByPrice}> Xem kết quả</button>
            <SortByPrice />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilterProduct;
