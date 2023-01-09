
import CreateSlider from "./component/CreateSlider";
import classNames from "classnames/bind";
import styles from './AdSlider.module.scss';

const cx = classNames.bind(styles);
function AdSlider() {
    return ( 
        <div className={cx('Wrapper')}>
            <CreateSlider />
        </div>
     );
}

export default AdSlider;