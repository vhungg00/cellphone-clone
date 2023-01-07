function Feature() {
  return (
    <section className="features__area pt-40 pb-20 pl-10 pr-10">
      <div className="container">
        <div className="features__inner">
          <div className="row row-cols-xxl-5 row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 gx-0">
            <div className="col">
              <div className="features__item d-flex white-bg">
                <div className="features__icon mr-15">
                  <i className="fal fa-rocket-launch" />
                </div>
                <div className="features__content">
                  <h6>Miễn phí vận chuyển</h6>
                  <p>Giao hàng miễn phí cho tất cả đơn hàng</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="features__item d-flex white-bg">
                <div className="features__icon mr-15">
                  <i className="fal fa-sync" />
                </div>
                <div className="features__content">
                  <h6>Hoàn tiền</h6>
                  <p>Đảm bảo hoàn tiền trong 30 ngày</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="features__item d-flex white-bg">
                <div className="features__icon mr-15">
                  <i className="fal fa-user-headset" />
                </div>
                <div className="features__content">
                  <h6>Hỗ trợ 24/7</h6>
                  <p>Hỗ trợ kỹ thuật</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="features__item d-flex white-bg">
                <div className="features__icon mr-15">
                  <i className="fal fa-thumbs-up" />
                </div>
                <div className="features__content">
                  <h6>Thanh toán an toàn</h6>
                  <p>Tất cả phương thức thanh toán đều được chấp nhận</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="features__item features__item-last d-flex white-bg">
                <div className="features__icon mr-15">
                  <i className="fal fa-badge-dollar" />
                </div>
                <div className="features__content">
                  <h6>Giảm giá thành viên</h6>
                  <p>Giảm giá tới 40% cho tất cả các sản phẩm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feature;
