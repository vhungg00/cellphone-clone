import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCate } from "~/appRedux/actions/cateAction";

import { DeleteOutlined } from "@ant-design/icons";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "../Feature.module.scss";

const cx = classNames.bind(styles);

function AllCategory() {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.cate.cateList.data);
  let loading = useSelector(state => state.product.isLoading);


  useEffect(() => {
    dispatch(getCate());
  }, []);

  const handleRemoveItem = (item) => {
    console.log(item)
  };

  const MenuCate = (temp) => (
    <div className={cx("item")}>
        <p>{temp.name}</p>
        <img src={temp.image} alt={temp.name} />
        <DeleteOutlined onClick={() => handleRemoveItem(temp)} />
    </div>
  )

  return (
    <div className={cx("cate_wrapper")}>
      <div className={cx("cate_item")}>
        {result &&
          result.length &&
          result.map((temp) => MenuCate(temp))}
      </div>

      { loading && <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />}

    </div>
  );
}

export default AllCategory;
