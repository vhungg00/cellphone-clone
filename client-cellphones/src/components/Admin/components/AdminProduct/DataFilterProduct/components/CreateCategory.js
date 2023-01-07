import classNames from "classnames/bind";
import styles from '../Feature.module.scss';

const cx = classNames.bind(styles);

function CreateCategory() {

    return ( <div className={cx('wrapper_cate')}>
        <h4>Create category</h4>
    </div> );
}

export default CreateCategory;