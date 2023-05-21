const fs=require('fs')
let {l,main,PORT} =require('./citadel/server')
let citadelControl=require('./citadel/citadelControl')
let {MainMind}=require('./MainMind.js');

let mainMind=new MainMind(main,citadelControl,fs);

/*запуск сервера*/
main.listen(PORT,()=>{
    l(`0o0 server: http://localhost:${PORT}`)
})

// Как Закрыть Уязвимые Порты
// https://www.youtube.com/watch?v=qSrNsIUZKbI&t=32s
//netstat -aon | more
//https://www.youtube.com/watch?v=CAld0A2A7VE

//https://2ip.io/ru/check-port/?port=4000

//https://www.youtube.com/watch?v=hO6V48GvmSI
//отключить порт командой taskkill /pid 18264 /f
//https://levelup.gitconnected.com/how-to-kill-server-when-seeing-eaddrinuse-address-already-in-use-16c4c4d7fe5d

// let {Index}=require('./citadel/classes/Index.js');
// let {Basket}=require('./citadel/classes/Basket.js');
// let {News}=require('./citadel/classes/News.js');
// let {Product}=require('./citadel/classes/Product.js');
// let {Signin}=require('./citadel/classes/Signin.js');
// let {Signup}=require('./citadel/classes/Signup.js');

// let home=new Index(main,citadelControl);
// let basket=new Basket(main,citadelControl);
// let product=new Product(main,citadelControl);
// let news=new News(main,citadelControl);
// let signin=new Signin(main,citadelControl);
// let signup=new Signup(main,citadelControl);
