import { useDispatch } from "react-redux";

import { Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { ascendingProduct, descendingProduct } from "~/appRedux/actions/productAction";

import DropdownC from "~/components/DropdownC";

import classNames from "classnames/bind";
import styles from './SortByPrice.module.scss';
const cx = classNames.bind(styles);

function SortByPrice() {
  const dispatch = useDispatch();

  const ascending = () => dispatch(ascendingProduct());
  
  const descending = () => dispatch(descendingProduct());

  const items = [
    {
      label: (
        <a
          className="ant-dropdown-menu-title-content-item"
          onClick={descending}
        >
        Thấp đến cao
        </a>
      ),
      key: "1",
    },

    {
      label: (
        <a
          className="ant-dropdown-menu-title-content-item"
          onClick={ascending}
        >
          Cao đến thấp
        </a>
      ),
      key: "2",
    },
  ];
  const menu = <Menu items={items} />;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className={cx("wrapper")}>
            <DropdownC menu={menu}>
              <span className={cx('custom_title')}>
                <p>Sắp xếp theo giá</p> <DownOutlined />
              </span>
            </DropdownC>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortByPrice;