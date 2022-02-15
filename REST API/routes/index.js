const express = require('express')
const todoRoute = require('../controller/todo.controller')
const router = express.Router()

router.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

router.get('/todo', todoRoute.listTodo)
router.post('/todo', todoRoute.insertTodo)
router.put('/todo/:id', todoRoute.updateTodo)
router.delete('/todo/:id', todoRoute.deleteTodo)

module.exports = router