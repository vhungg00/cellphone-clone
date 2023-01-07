import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import { formatPrice } from '~/untils';
import { memo } from 'react';
const cx = classNames.bind(styles);

function SearchItem({data, onHideResultClick}) {
    return ( <Link key={data._id} to={`/product-detail/${data.slug}`} onClick={onHideResultClick} className={cx('result-item')}>
        <Image
            className={cx('result-item-image')} 
            alt='product'
            src={data.image} 
        />
        <div className={cx('result-item-body')}>
            <h5 className={cx('item-name')}>{data.name}</h5>
            <div className={cx('item-price')}>
                <span>{formatPrice(data.salePrice)}</span>
                <span>{formatPrice(data.price)}</span>
            </div>
        </div>
    </Link> );
}

export default memo(SearchItem);