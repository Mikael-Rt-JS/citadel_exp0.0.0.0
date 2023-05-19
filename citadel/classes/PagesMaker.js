let {SQlFunc} =require('./dbMySQL.js')

class PagesMaker extends SQlFunc{
    ejsPageShablon=`<%- include("blocks/doctype.ejs") -%>
<% for(let i=0;i<citadelControl[page].fileCSS.length;i++){ %>
    <link href="<%= citadelControl[page].fileCSS[i] %>" rel="stylesheet" type="text/css" />
<% } %>
<!-- <link href="/css/global.css" rel="stylesheet" type="text/css" /> -->
<title><%= pagename %></title>
</head>
<body>
    <% for(let i=0;i<citadelControl[page].fileBlocks.length;i++){ %>
        <%- include(citadelControl[page].fileBlocks[i]) -%>
    <% } %>
    
    <% for(let i=0;i<citadelControl[page].fileJS.length;i++){ %>
        <script src="<%= citadelControl[page].fileJS[i] %>"></script>
    <% } %>
</body>
</html>`;
    
    constructor(main,citadelControl,fs){
        super();

        // переход на страницу создание файла
        main.get('/pages_maker',async (req,res)=>{
            // console.log(await this.getAll('test'))
            res.render(`pages_maker`,{
                page:'pages_maker',
                citadelControl:citadelControl,
                pagename: 'Maker pages'
            })
        })

        /*
const conn={
        host:'localhost',
        user:'root',
        // express_magazine
        database:'ll',
        password:'secret'
}


module.exports={
    config:conn
}
        */
        // подключается к базе данным
        main.post('/config_databes',(req,res)=>{
let configText=`
const conn={
    host:'${req.body.localhost}',
    user:'${req.body.user}',
    // express_magazine
    database:'${req.body.databasename}',
    password:'${req.body.password}'
}


module.exports={
    config:conn
}`;
            fs.writeFile(`citadel/classes/configMySQL.js`,configText,(err)=>{
                if(err){
                    console.log(err)
                    res.redirect(`/pages_maker/write_error`)
                }
            })
            return res.redirect('/pages_maker')
        })

        // создаётся файл и его класс
        main.post('/page_create_file',(req,res)=>{
            // console.log(req.body)
            fs.writeFile(`views/${req.body.filename}.${req.body.extension}`,this.ejsPageShablon,(err)=>{
                if(err){
                    console.log(err)
                    res.redirect(`/pages_maker/write_error`)
                }
            })
            fs.writeFile(`citadel/classes/${this.createNameForFileClass(req.body.filename)}.js`,this.createForPageClass(req.body.filename),(err)=>{
                if(err){
                    console.log(err)
                    res.redirect(`/pages_maker/write_error`)
                }
            })
            return res.redirect('/pages_maker')
        })
        
        main.post('/create_table',async (req,res)=>{
            // console.log(req.body)

            let sqlStr=`CREATE TABLE ${req.body.tableNewName}(`;
            let columns=req.body.tableColumns
            for(let i=0;i<columns.length;i++){
                if(i<columns.length-1){
                    if(columns[i].auto_increment){
                        sqlStr+=`${columns[i].name} ${columns[i].type}${this.checkType(columns[i].type,columns[i].length)} AUTO_INCREMENT ${this.checkDataNotDefault(columns[i].index)}, `
                    }else{
                        sqlStr+=`${columns[i].name} ${columns[i].type}${this.checkType(columns[i].type,columns[i].length)} ${this.checkDataNotDefault(columns[i].index)}, `
                    }
                }else{
                    if(columns[i].auto_increment){
                        sqlStr+=`${columns[i].name} ${columns[i].type}(${this.checkType(columns[i].type,columns[i].length)} AUTO_INCREMENT ${this.checkDataNotDefault(columns[i].index)}`
                    }else{
                        sqlStr+=`${columns[i].name} ${columns[i].type}${this.checkType(columns[i].type,columns[i].length)} ${this.checkDataNotDefault(columns[i].index)}`
                    }
                }
                
            }
            sqlStr+=`);`
            let call=await this.createTable(sqlStr);
            /*
        CREATE TABLE animals(
            id INT(11) AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            date DATE,
            time TIMESTAMP
        );
        */
            if(await call){
                return res.json({'name':req.body.tableNewName})
            }
        })
    }
    //------------------------------------------------ REQUEST END

    // делает за главную букву начало первого символа  
    createNameForFileClass(filename){
        let classNameFile=filename[0].toUpperCase()+filename.slice(1);
        return classNameFile;
    }

    // проверяет равна ли строка "---"
    checkDataNotDefault(str){
        return str==='---'? "": str;
    }

    // проверка типа для баз данных
    checkType(type,length){
        if(type === "TIMESTAMP" || type === "DATE" || type === "BOOLEAN"){
            return "";
        }else{
            return `(${+length})`
        }
    }

    // создаёт класс для страницы
    createForPageClass(filename){
        let className=this.createNameForFileClass(filename)

        return `let {SQlFunc} =require('./dbMySQL.js')

class ${className} extends SQlFunc{
    constructor(main,citadelControl){
        super();
    
        /*main.get('/',async (req,res)=>{
            console.log(await this.getAll('categories'))
            res.render(\`index\`,{
                page:'home',
                citadelControl:citadelControl,
                pagename: 'Home page'
            })
        })*/
        
        /*
        main.post('/page_create_file',(req,res)=>{
            console.log(req.body)
            return res.redirect('/pages_maker')
        })
        */
    }
    
    checkConnect(){
        console.log(this.noResult())
    }
}
        
module.exports={
    ${className}: ${className}
}
`;
    }

    // 

}

module.exports={
    PagesMaker: PagesMaker
}

        /*let username=req.body.username
            if(username===''){
                return res.redirect('/')
            }else{
                return res.redirect(`/user/${username}`)
        
            }*/
