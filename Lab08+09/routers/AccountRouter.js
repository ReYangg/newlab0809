const express = require('express')
const Router = express.Router() 
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerValidator = require('./validators/registerValidator')
const loginValidator = require('./validators/loginValidator')
const AccountModel = require('../models/AccountModel')

Router.get('/',(req,res) =>{
    res.json({
        code: 0,
        message: 'Account router'
    }) 
})

Router.post('/login',loginValidator,(req,res) => {
    let result = validationResult(req)
    
    if (result.errors.length === 0){
        let {email, password} = req.body
        let account = undefined

        AccountModel.findOne({email: email})
        .then(data =>{
            if(!data){
                throw new Error("Email không tồn tại")
            }
            account = data
            return bcrypt.compare(password,data.password)
        })
        .then(passwordMatch => {
            if (!passwordMatch){
                return res.status(401).json({
                    code: 1,
                    message: 'Mật khẩu không đúng'
                })
            }
            const {JWT_SECRET} = process.env
            jwt.sign({
                email: account.email
                
            },JWT_SECRET,{
                expiresIn: '1h'
            },(err, token) =>{
                if (err) throw err
                return res.json({
                    code: 0,
                    message: 'Đăng nhập thành công',
                    token: token
                })
            })
        })
        .catch(e => {return res.status(401).json({
                code: 2,
                message: "Lỗi: " + e.message
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

Router.post('/register',registerValidator,(req,res) => {
    let result = validationResult(req)

    if (result.errors.length === 0){

        let {email, password} = req.body

        AccountModel.findOne({email: email})
        .then(data => {
            if (data){
                throw new Error('Tài khoản đã tồn tại')
            }
        })
        .then(() =>  bcrypt.hash(password,10))     
        .then(hashed => {
            let user = new AccountModel({
                email: email,
                password: hashed 
            })
            return  user.save()
                 
        }) 
        .then(() => {
            return res.json({code: 0, message: 'Đăng ký tài khoản thành công'})
        })   
        .catch(e => {
            return res.json({code: 1, message: 'Lỗi: '+ e.message})
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

module.exports = Router