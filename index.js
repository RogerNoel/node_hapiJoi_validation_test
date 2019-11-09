const http = require('http');
const server = http.createServer((req, res)=>{
    const serverState = res.end('server ON')
    console.log(serverState)
})

server.listen(3000,()=>{
    console.log('server listening on port 3000')
})