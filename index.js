//Входной файл в приложение
//Подключаем экспресс
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

//Если есть системная переменная PORT, 
//то тогда берем ее из системной переменно, иначе по умолчанию будет PORT 3000
const PORT = process.env.PORT || 3000

//Создаем объект нашего приложения через вызов функции express()
const app = express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: 'hbs'
})

//Зарегестрировали движок hbs по ключу hbs.engine
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//Регистрируем роут
app.use(todoRoutes)

async function start() {
    try {
        //Подключение к базе данных
        await mongoose.connect(
            'mongodb+srv://natalia:.6ymi6EG!LZ3!8Z@cluster0.wtl8e.mongodb.net/todos',
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )
        //Обращаемся к объекту app и вызываем функцию listen(), 
        //которая позволяет запустить сервер
        app.listen(PORT, () => {
            console.log('Server has been started...')
        })

    } catch (e) {
        console.log(e)
    }
}

start()