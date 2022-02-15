const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('<b>Hello World!</b>')
})

app.get('/products', (req, res) => {
    const list = {"category":[{"id":1,"name":"Makanan"},{"id":2,"name":"Minuman"},{"id":3,"name":"Snack"}]};
    res.send(list)
})

app.get('/test', (req, res) => {
    const body = {"body": req.query}
    res.send(body)
})

app.get('/data', (req, res) => {
    const body = fs.readFileSync('data.json')
    
    res.send(JSON.parse(body))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})