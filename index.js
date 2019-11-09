const http = require('http');
const mongoose = require('mongoose')

mongoose.connect('mongodb:localhost:27017/hapijoi', {useNewUrlParser: true});

const humanSchema = new mongoose.Schema({
    FirstName: String,
    lastName: String,
    age: Number,
    isMarried: Boolean
});

const HumanModel = mongoose.model('human', humanSchema);


const server = http.createServer((req, res)=>{
    const serverState = res.end('server ON')
    console.log(serverState)
})

server.listen(3000,()=>{
    console.log('server listening on port 3000')
})