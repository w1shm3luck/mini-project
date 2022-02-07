const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<b>Hello World!</b>')
})

app.get('/products', (req, res) => {
    const list = {"category":[{"id":1,"name":"Makanan"},{"id":2,"name":"Minuman"}]};
    res.send(list)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

