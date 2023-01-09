
import { useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from '../AdSlider.module.scss';
import { deleteSlider, getAllSlider } from "~/appRedux/actions/SliderAction";

const cx = classNames.bind(styles);
export default function AllSlider() {
  const dispatch = useDispatch();
  let loading = useSelector(state => state.slider.isLoading);
  const sliderList = useSelector(state => state.slider.imageList)
  console.log('sliderList: ', sliderList);
  useEffect(() => {
    dispatch(getAllSlider());
  }, [dispatch]);

  const handleRemoveItem = async (item) => {
    console.log(item._id)
    await dispatch(deleteSlider(item._id));
    await dispatch(getAllSlider())
  }
  const MenuFirmProduct = (firmItem) => (
    <div key={firmItem._id} className={cx("Slider_item")}>
      <img src={firmItem.img} alt=""></img>
      <div
        className={cx("icon_delete")}
        onClick={() => handleRemoveItem(firmItem)}
      >
        <span>
          { loading ? <FontAwesomeIcon className={cx("loading")} icon={faSpinner} /> : <DeleteOutlined />}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <div className={cx("Slider_wrapper")}>
        {sliderList.length > 0
          ? sliderList.map((item) => MenuFirmProduct(item))
          : undefined}
      </div>
    </div>
  );
}
