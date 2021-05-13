const { Router } = require('express')
const Todo = require('../models/Todo')
const router = Router()
//Для обработки get запросов со сраницы To Do List
router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'TO DO List',
        isIndex: true,
        todos
    })

})
//Для обработки get запросов со сраницы Create
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create TO DO',
        isCreate: true
    })

})
//Для обработки post запросов со сраницы To Do List
router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})
//Для обработки post запросов со сраницы Create
router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect('/')
})
//Экспортируем роут
module.exports = router