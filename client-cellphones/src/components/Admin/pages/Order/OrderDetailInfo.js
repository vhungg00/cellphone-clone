import React from "react";

import PropTypes from 'prop-types';

const OrderDetailInfo = ({order}) => {
  const { shippingAddress = {}, paymentMethod = '', user = {} } = order || {};

  const { name = '', email = ''} = user || {};
  const { more = '', ward = '', phone = '', province = '', district = ''} = shippingAddress || {};
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Customer</h6>
            <p className="mb-1">
              {name} <br />
              <a href={`mailto:${email}`}>{email}</a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Order info</h6>
            <p className="mb-1">
              Shipping: {province} <br /> Pay method:{" "}
              {paymentMethod}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Deliver to</h6>
            <p className="mb-1">
              Address: {more}
              <br />
              {ward}
              <br /> {district} <br /> {province}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

OrderDetailInfo.propTypes = {
  order: PropTypes.object.isRequired,
}

export default OrderDetailInfo;
