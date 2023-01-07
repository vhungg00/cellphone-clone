
import React from 'react';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './AdminLayout.module.scss';
import SideBar from './components/SideBar';
import Topnav from './components/Topnav';
const cx = classNames.bind(styles);
function AdminLayout({children}) {
    return ( 
        <div className={cx('wrapper')}>
                <Topnav />
            <div className={cx('content')}>
                    <SideBar />
                <div className={cx('inner')}>
                    {children}
                </div>
            </div>
        </div>
     );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default AdminLayout;