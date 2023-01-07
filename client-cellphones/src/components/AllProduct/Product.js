import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatPrice } from "~/untils";

function Product({ product }) {
    
    const { slug="", image = "", name = "", salePrice = 1, price = 1, percentDiscount = 1 } = product || {};
  function AddToCart(product) {
    // const action = AddProduct(product);
    // dispatch(action);
  }

  return (
    <div className="product__item product__item-2 white-bg">
      <div className="product__item-link">
        <div className="product__thumb p-relative">
          <Link
            to={`/product-detail/${slug}`}
            className="product__thumb-img w-img"
          >
            <img src={image} alt="product" />
          </Link>
        </div>
        <div className="product__content text-center">
          <h6 className="product-name">
            <Link
              to={`/product-detail/${slug}`}
              className="product-item-link"
            >
              {name}
            </Link>
          </h6>
          <div className="price">
            <span>{formatPrice(salePrice)}đ</span>
            <span>{formatPrice(price)}đ</span>
          </div>
          <div className="product__content-percent">
            <p className="product__content-percent-detail">
              Giảm {percentDiscount}%
            </p>
          </div>
          <div className="promotion">
            <p className="gift-cont">Giảm 10% loa Soundbar khi mua kèm TV</p>
          </div>
        </div>
      </div>
    </div>
  );
}
Product.propTypes = {
    product: PropTypes.object.isRequired
}

export default Product;
