import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import SlideToggle from "react-slide-toggle";

import { getCate } from "~/appRedux/actions/cateAction";

import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { AppsOutlined } from "@material-ui/icons";
import config from "~/config";

const cx = classNames.bind(styles);
function Categoryweb() {
  const result = useSelector((state) => state.cate.cateList.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCate());
  }, [dispatch]);
  return (
    <SlideToggle duration={900} offsetHeight={300}>
      {({ toggle, setCollapsibleElement, progress }) => (
        <div className="cat__menu-wrapper">
          <div className="cat-toggle cat-toggle-2">
            <button type="button" className="cat-toggle-btn" onClick={toggle}>
              <i className="fas fa-bars"></i> Danh mục sản phẩm
            </button>
            <div className="cat__menu" ref={setCollapsibleElement}>
              <nav
                id="mobile-menu"
                style={{
                  opacity: Math.max(0, progress),
                  height: Math.max(315, progress),
                }}
              >
                <ul>
                  <li>
                    <Link to={config.routes.allProduct}>
                      <AppsOutlined />
                      <span style={{display: 'block', marginLeft: '0.6rem'}}>Tất cả sản phẩm</span><i className="far fa-angle-down"></i>
                    </Link>
                  </li>
                  {result &&
                    result.map((item) => (
                      <li key={item.name}>
                        <Link to={`/category/${item.slug}`}>
                          <i className={cx('icon-cate')} style={{
                            backgroundImage: `url(${item.image})`
                          }}></i>
                          <span>{item.name} </span><i className="far fa-angle-down"></i>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </SlideToggle>
  );
}

export default Categoryweb;
