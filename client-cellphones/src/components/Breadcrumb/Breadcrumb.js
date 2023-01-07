import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { IconHome } from "../Icons";
const cx = classNames.bind(styles);
function Breadcrumb({className, slugCate ,brands, name, title }) {
  return (
    <section className={cx("breadcrumb__area")}>
      <div className={cx("breadcrumb__wrapper", "affix")}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <nav aria-label="breadcrumb">
                  <ol className={cx("breadcrumb__box", 'breadcrumb')}>
                    <li className="breadcrumb-item">
                      <IconHome className={cx('icon_home')} />
                      <Link to="/">Trang chủ</Link>
                    </li>
                    {title && <li className="breadcrumb-item">
                     {title}
                    </li>}
                    {slugCate && <li className={cx(``, 'breadcrumb-item')} >
                      {slugCate}
                    </li>}
                    {brands && <li className={cx("breadcrumb-item")} >
                      {brands}
                    </li>}
                    {name && <li className={cx(`${name ? 'active' : 'null'}`, 'breadcrumb-item')} >
                      {name}
                    </li>}
                  </ol>
                </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
Breadcrumb.propTypes = {
  className: PropTypes.string,
  slugCate: PropTypes.string,
  brands: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
}
export default Breadcrumb;
