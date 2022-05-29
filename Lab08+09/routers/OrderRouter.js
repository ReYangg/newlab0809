const express = require('express')
const Router = express.Router() 

const {validationResult} = require('express-validator')
const OrderValidator = require('./validators/orderValidator')
const Order = require('../models/OrderModel')
const Product = require('../models/ProductModel')

Router.get('/',(req,res) =>{
    Order.find().select("idOrder totalprice listProduct -_id")
    .then(orders => {
        res.json({
            code: 0,
            message: orders
        })
    })
    
})

Router.post('/',OrderValidator,(req,res) => {
    let result = validationResult(req)
    
    if (result.errors.length === 0){
        Order.findOne({idOrder:req.body.idOrder})
        .then(data => {
            if (data){
                return res.json({
                    code: 1,
                    message: "ID đã tồn tại"
                })
            }else{
                let orderListProduct = []     
                let {idOrder,totalprice,listProduct} = req.body    
                for (product in listProduct){         
                    Product.findOne({idProduct:listProduct[product]})
                    .then(data => {  
                        if(data){
                            orderListProduct.push(data)
                        }                                                                                                         
                    })           
                    .catch(e => {
                        return res.json({
                            code: 1,
                            message: e
                        })
                    })
                }
                let order = new Order({
                    idOrder:idOrder,
                    totalprice:totalprice,
                    listProduct:orderListProduct
                })
                return order.save()       
            }                 
        })
        .then(() => {
            return res.json({
                code: 0,
                message: "Thêm thành công"
            })
        })
        .catch(e => {
            return res.json({
                code: 2,
                message: "Lỗi" + e
            })
        })                                 
    }else{
        let messages = result.mapped()
        let message = ''
        for (m in messages){
            message = messages[m].msg
            break
        } 
        return res.json({code: 1, message:message})  
    }
})

Router.get('/:id',(req,res) =>{
    Order.findOne({idOrder: req.params.id}).select('idOrder totalprice listProduct -_id')
    .then(order =>{
        if (order){
            return res.json({
                code: 0,
                message: order
            })
        }else{
            return res.json({
                code: 1,
                message: "Không tìm thấy đơn hàng với mã là: " + req.params.id
            })
        }
    })
})

Router.delete('/:id',(req,res) =>{
    Order.findOneAndRemove({idProduct: req.params.id})
    .then(product =>{
        if (product){
            return res.json({
                code: 0,
                message: "Xóa thành công đơn hàng với mã là: "+ req.params.id
            })
        }else{
            return res.json({
                code: 1,
                message: "Không tìm thấy đơn hàng với mã là: " + req.params.id
            })
        }
    })
})

module.exports = Router