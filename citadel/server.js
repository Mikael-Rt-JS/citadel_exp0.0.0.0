// require('dotenv').config()
const express=require('express')
const bodyParser = require('body-parser');

const l=console.log;
const PORT=4000
const main=express()

// добавляем шаблонизатор
main.set('view engine','ejs')

// использование для получение данных с адресов
main.use(bodyParser.urlencoded({ extended: false }));
main.use(bodyParser.json())
// main.use(express.urlencoded({extended:false}))

// используем статические файлы
main.use(express.static('assets'))

module.exports={
    l:l,
    PORT:PORT,
    main:main
}
