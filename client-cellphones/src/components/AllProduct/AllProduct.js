import { useDispatch, useSelector } from 'react-redux';


import { Pagination } from 'antd';

import Loading from '../Loading';
import Product from './Product';

import Breadcrumb from '../Breadcrumb';

import { getAllProducts } from '~/appRedux/actions/productAction';
import { handlePercentDiscount } from '~/untils';
import FilterProduct from './FilterProduct';

import './Sale.css';

import classNames from 'classnames/bind';
import styles from './Allproduct.module.scss';
const cx = classNames.bind(styles);

function AllProduct() {

    const dispatch = useDispatch()

    const pages = useSelector((state) => state.product.pages);
    const current = useSelector((state) => state.product.current);

    const products = useSelector(state => state.product.products)
    let loading = useSelector(state => state.product.isLoading)
    const handleChangePage = async (number) => {
        console.log('number:', number);
        await dispatch(getAllProducts("", number));
    }
    // useEffect(() => {
    //     handleChangePage()
    //     return () => {
    //         return []
    //     }
    // }, [dispatch])
   
    const temps = handlePercentDiscount(products)

    return (
        <section className={cx('product_area')}>
            <Breadcrumb title ='Tất cả sản phẩm' />
            <FilterProduct />
            <div className={cx('wrapper')}>
                {loading && <Loading title='Vui lòng chờ...' />}
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
                onChange={handleChangePage}
                />
            </div>
        </section>

    );
}


export default AllProduct;