require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const AccountRouter = require('./routers/AccountRouter')
const OrderRouter = require('./routers/OrderRouter')
const ProductRouter = require('./routers/ProductRouter')

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/',(req,res) => {
    res.json({
        code: 0,
        message: 'Hello'
    })
})

app.use('/account',AccountRouter)
app.use('/orders',OrderRouter)
app.use('/products',ProductRouter)

const port = process.env.PORT || 8080
 
mongoose.connect(process.env.connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {   
    app.listen(port)
}).catch(e => console.log("Error: "+ e))

