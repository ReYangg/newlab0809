const {check} = require('express-validator')


module.exports = [
    check('email')
    .exists().withMessage('Vui lòng cung cấp Email')
    .notEmpty().withMessage('Email không được để trống')
    .isEmail().withMessage('Email không hợp lệ'),

    check('password')
    .exists().withMessage('Vui lòng cung cấp Password')
    .notEmpty().withMessage('Password không được để trống')
    .isLength({min:6}).withMessage('Password phải có tối thiếu 6 ký tự'),
]
    

