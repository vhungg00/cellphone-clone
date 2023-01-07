import {check} from 'express-validator';

const validateLoginUser = () => {
    return [
        check('email', 'Trường này không được để trống').not().isEmpty(),
        check('email', 'Trường này phải là email').isEmail(),
        check('password', 'Mật khẩu lớn hơn 6 kí tự').isLength({min: 6})
    ]
}

const validateRegisterUser = () => {
    return [
        check('name', 'Trường này không được để trống').not().isEmpty(),
        check('email', 'Trường này không được để trống').not().isEmpty(),
        check('email', 'Trường này phải là email').isEmail(),
        check('password', 'Mật khẩu lớn hơn 6 kí tự').isLength({min: 6}),
        
    ]
}

const validateCreateProduct = () => {
    return [
        check('name', 'Trường này không được để trống').not().isEmpty(),
        check('price', 'Trường này không được để trống').not().isEmpty(),
        check('price', 'Vui lòng nhập giá cho sản phẩm').isNumeric(),
        check('salePrice', 'Vui lòng nhập trường này').not().isEmpty(),
        check('slug', 'Vui lòng nhập trường này').not().isEmpty(),
        check('category', 'Vui lòng nhập trường này').not().isEmpty(),
        check('status', 'Vui lòng nhập trường này').not().isEmpty(),
    ]
}

let validate = {
    validateLoginUser: validateLoginUser,
    validateRegisterUser: validateRegisterUser,
    validateCreateProduct: validateCreateProduct
}

export default validate;