const { Schema, model } = require('mongoose')

//конструктор
const schema = new Schema({
    //Параметры 
    title: {
        type: String,//String-глобальный класс в js
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)