import { useEffect, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Image from '~/components/Image/Image';
import { getProductByCategory } from '~/appRedux/actions/cateAction';
import PrdByCate from '~/components/AllProduct/PrdByCate/components/PrdByCate';
import Loading from '~/components/Loading';

import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import FilterProduct from '~/components/AllProduct/FilterProduct';
import { Pagination } from 'antd';
import Product from '~/components/AllProduct/Product';
const cx = classNames.bind(styles);

function Category() {
    const dispatch = useDispatch();
    const { slugCate } = useParams();
    let loading = useSelector( state => state.cate.isLoading);

    const temps = useSelector( state => state.cate.cate);
    const pages = useSelector((state) => state.product.pages);
    const current = useSelector((state) => state.product.current);
    useEffect(() => {
        const fetchApi = async () => {
            await dispatch(getProductByCategory(slugCate))
            loading = false;
        }
        fetchApi();
    }, [slugCate])

    const HandleChangePage = async (number) => {
        await dispatch(getProductByCategory("", number));
        loading = false;
    };
    return ( 
        <div className="cate">
            {loading && <Loading title='Vui lòng chờ...' />}
            <Breadcrumb slugCate = {slugCate} />
            <FilterProduct />
            <div className={cx('wrapper')}>
                <div className="container">
                   <div className='row row-cols-xxl-5 row-cols-xl-5 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 gx-0'>
                        {temps ? (
                                temps.map(temp => (<div key={temp._id} className="col">
                                    <Product product={temp} />
                                </div>))
                            ): (<h3>Chưa có sản phẩm nào</h3>) }
                        
                            
                        </div>
                </div>
            </div>
            <div className={cx("pagination")}>
                <Pagination
                defaultCurrent={1}
                current={current}
                total={pages * 10}
                onChange={HandleChangePage}
                />
            </div>
        </div>
     );
}

export default memo(Category);