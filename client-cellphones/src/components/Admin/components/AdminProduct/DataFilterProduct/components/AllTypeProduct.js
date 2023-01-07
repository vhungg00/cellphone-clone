import { useEffect } from "react";

import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteTypeProduct, getAllTypeProduct } from "~/appRedux/actions/productAction";
// import { deleteTypeProduct, getAllTypeProduct } from "../../../../../actions/ListTypeProductAction";

import classNames from "classnames/bind";
import styles from "../Feature.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);

export default function AllTypeProduct() {
  const dispatch = useDispatch();
  let loading = useSelector(state => state.product.isLoading);
  const temps = useSelector((state) => state.product.typePrds);
  useEffect(() => {
    dispatch(getAllTypeProduct());
    loading = false;
  }, [dispatch]);

  const handleRemoveItem = async (item) => {
    console.log(item._id)
    await dispatch(deleteTypeProduct(item._id));
    await dispatch(getAllTypeProduct())
    loading = false;
  }
  const MenuFirmProduct = (firmItem) => (
    <div key={firmItem._id} className={cx("type_item")}>
      <img src={firmItem.img}></img>
      <div
        className={cx("icon_delete")}
        onClick={() => handleRemoveItem(firmItem)}
      >
        <span>
          <DeleteOutlined />
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className={cx("type_wrappeer")}>
        {temps.length > 0
          ? temps.map((item) => MenuFirmProduct(item))
          : undefined}
          { loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}
      </div>
    </div>
  );
}
