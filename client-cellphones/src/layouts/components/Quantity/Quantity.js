import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Quantity() {

  const carts = useSelector((state) => state.cart.carts);
  useEffect(() => {
    carts?.length > 0 && localStorage.setItem("CART_ITEM", JSON.stringify(carts));
  }, [carts]);

  return (
    <>
      <Link to={`/cart/qty=${carts?.length}`} className="cart__toggle">
        <span className="cart__total-item">{ carts?.length === undefined ? '0': carts?.length  }</span>
      </Link>
      <span className="cart__content">
        <span className="cart__my">Giỏ hàng</span>
      </span>
    </>
  );
}

export default memo(Quantity);
