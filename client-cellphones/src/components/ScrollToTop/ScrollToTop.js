import { useEffect, useState } from "react";
import { BackTop } from "antd";
import classNames from "classnames/bind";
import styles from "./ScrollToTop.module.scss";
import { useCallback } from "react";
import { IconUp } from "~/components/Icons";
const cx = classNames.bind(styles);
const CONSTANTS = "1000";
function ScrollToTop() {
  const [height, setHeight] = useState(0);
  const handleScrollToTop =useCallback(() => setHeight(window.pageYOffset),[])
  useEffect(() => {
    window.addEventListener("scroll", handleScrollToTop);
    return () => window.removeEventListener('scroll', handleScrollToTop)
    }, [height, handleScrollToTop]);
  return (
    <>
      { height > CONSTANTS ? (
        <BackTop>
        <section className={cx("backToTop")}>
          <div className={cx("icon-up")}>
            <IconUp />
          </div>
          <strong>Lên đầu</strong>
        </section>

        </BackTop>
      ) : null}
    </>
  );
}

export default ScrollToTop;
