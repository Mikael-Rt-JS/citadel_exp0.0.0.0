let {PagesMaker}=require('./citadel/classes/PagesMaker.js');
//add page this

class MainMind{
    constructor(main,citadelControl,fs){
        let pages_maker=new PagesMaker(main,citadelControl,fs);
		//add var page this
    }
}

module.exports={
    MainMind: MainMind
}
