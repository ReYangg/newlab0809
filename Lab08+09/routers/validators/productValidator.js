const {check} = require('express-validator')


module.exports = [
    check('idProduct')
    .exists().withMessage('Vui lòng cung cấp mã sản phẩm')
    .notEmpty().withMessage('Mã sản phẩm không được để trống'),

    check('name')
    .exists().withMessage('Vui lòng cung cấp tên sản phẩm')
    .notEmpty().withMessage('Tên sản phẩm không được để trống'),

    check('price')
    .exists().withMessage('Vui lòng cung cấp giá sản phẩm')
    .notEmpty().withMessage('Giá sản phẩm không được để trống')
    .isNumeric().withMessage('Giá sản phẩm không hợp lệ'),

    check('description')
    .exists().withMessage('Vui lòng cung cấp mô tả')
    .notEmpty().withMessage('Mô tả không được để trống'),
]
    

