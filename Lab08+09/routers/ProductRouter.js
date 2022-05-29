const express = require('express')
const Router = express.Router() 
const {validationResult} = require('express-validator')

const ProductValidator = require('./validators/productValidator')
const Product = require('../models/ProductModel')

Router.get('/',(req,res) =>{
    Product.find().select('idProduct name price description -_id')
    .then(products =>{
        res.json({
            code: 0,
            message: 'Danh sách sản phẩm',
            data: products
        })
    })
    
})

Router.post('/',ProductValidator,(req,res) =>{
    let result = validationResult(req)
    if (result.errors.length === 0){
        const {idProduct,name, price, description} = req.body
        Product.findOne({idProduct:idProduct})
        .then(data =>{
            if(data){
                return res.json({
                    code: 1,
                    message: "Mã sản phẩm đã tồn tại"
                })
            }else{
                let product = new Product({
                    idProduct,name,price,description
                })
        
                product.save()
                .then(() => {
                    return res.json({
                        code: 0,
                        message: "Thêm sản phẩm thành công",
                        data: product
                    })
                })
                .catch(e => {
                    return res.json({
                        code: 2,
                        message: "Lỗi "+ e
                    })
                })
            }
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
    Product.findOne({idProduct: req.params.id}).select('idProduct name price description -_id')
    .then(product =>{
        if (product){
            return res.json({
                code: 0,
                message: product
            })
        }else{
            return res.json({
                code: 1,
                message: "Không tìm thấy sản phẩm với mã là: " + req.params.id
            })
        }
    })
   
})

Router.put('/:id',(req,res) =>{
    const filter = {idProduct: req.params.id}
    let {name, price, description} = req.body
    const update = { name:name, price:price,description:description}
    Product.findOneAndUpdate(filter,update)
    .then(product =>{
        if (product){
            return res.json({
                code: 0,
                message: "Sửa thành công sản phẩm với mã là: "+ req.params.id
            })
        }else{
            return res.json({
                code: 1,
                message: "Không tìm thấy sản phẩm với mã là: " + req.params.id
            })
        }
    })
})

Router.delete('/:id',(req,res) =>{
    Product.findOneAndRemove({idProduct: req.params.id})
    .then(product =>{
        if (product){
            return res.json({
                code: 0,
                message: "Xóa thành công sản phẩm với mã là: "+ req.params.id
            })
        }else{
            return res.json({
                code: 1,
                message: "Không tìm thấy sản phẩm với mã là: " + req.params.id
            })
        }
    })
})

module.exports = Router