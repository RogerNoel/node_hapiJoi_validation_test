const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

mongoose.connect('mongodb://localhost/hapijoi', 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
})
.then(()=>{console.log('connected to mongodb')})
.catch(err => console.log(err))

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    isMarried: {type: Boolean, default: false}
});

const CustomerModel = mongoose.model('customer', customerSchema);

const customerJoiSchema = Joi.object({
    lastName: Joi.string().min(4).max(20).required(),
    firstName: Joi.string().min(3).max(20).required(),
    age: Joi.number().required(),
    isMarried: Joi.boolean()
})

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/customers', async (req, res)=>{
    const customers = await CustomerModel.find()
    res.send(customers)
})

app.post('/customer', async (req, res)=>{
    try {
        const {error} = await customerJoiSchema.validate(req.body)
        if (error) return res.send(error.details[0].message)
        let newcustomer = new CustomerModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            isMarried: req.body.isMarried
        })
        newcustomer = await newcustomer.save()
        res.send(newcustomer)
    }
    catch(err) {
        console.log('error', err)
        res.status(400).send('bad request')
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port} !`))