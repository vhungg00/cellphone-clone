import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles);


function DefaultLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('content')}>
                {children}
            </div>
            <Footer/>
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default DefaultLayout;