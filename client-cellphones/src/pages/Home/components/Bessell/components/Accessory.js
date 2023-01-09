import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "~/appRedux/actions/productAction";
import Hotsale from "~/components/HotSale/components/Hotsale";
import { handlePercentDiscount, hotSale } from "~/untils";
function Accessory() {
  const [loading, setLoading] = useState(false);
  const data = useSelector((state) => state.product.products);
  const result = handlePercentDiscount(data);
  const products = hotSale(result);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchApi = async () => {
      await setLoading(true);
      await dispatch(getAllProducts());
      await setLoading(false);
    };
    fetchApi();
  }, [dispatch]);
  return (
    <div className="product__slider owl-carousel">
      {loading && <Spin size="large" />}
      {!loading && <Hotsale products={products} />}
    </div>
  );
}

export default Accessory;
