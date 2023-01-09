
import CreateSlider from "./component/CreateSlider";
import classNames from "classnames/bind";
import styles from './AdSlider.module.scss';
import AllSlider from "./component/AllSlider";

const cx = classNames.bind(styles);
function AdSlider() {
    return ( 
        <div className={cx('Wrapper')}>
            <AllSlider />
            <CreateSlider />
        </div>
     );
}

export default AdSlider;