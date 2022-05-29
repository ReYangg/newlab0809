const {check} = require('express-validator')


module.exports = [
    check('idOrder')
    .exists().withMessage('Vui lòng cung cấp mã đơn hàng')
    .notEmpty().withMessage('Mã đơn hàng không được để trống'),
    

    check('totalprice')
    .exists().withMessage('Vui lòng cung cấp tổng giá tiền')
    .notEmpty().withMessage('Tổng giá tiền không được để trống')
    .isNumeric().withMessage('Vui lòng nhập số'),
]
    

