import images from '~/assets/images'
import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

console.log(images.noImage)
const Image = forwardRef(({className, alt, src, fallback: customFallback = images.noImage,...props}, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(customFallback)
    }
    return (
        <img
            ref={ref}
            className={cx('wrapper', className)}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
         />
    )
} )

Image.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string,
    src: PropTypes.string,
    fallback: PropTypes.string
}

export default Image;