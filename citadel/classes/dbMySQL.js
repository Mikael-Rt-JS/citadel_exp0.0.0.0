const mysql2=require('mysql2/promise')
const config=require('./configMySQL.js')

class SQlFunc{
    noResult(){
        return {
            tdData:[],
            rowsLength:0,
            thKeys:['id','data']
        };
    }

    result(tdData,rowsLength,thKeys){
        return {
            tdData:tdData,
            rowsLength:rowsLength,
            thKeys:thKeys
        };
    }


    async getAll(tablename){
        const conn=await mysql2.createConnection(config.config);
        const [rows,fields]=await conn.execute(`select * from ${tablename}`)
        let thKeys=[]; /* ----  console.log(fields[0].name) */
        // console.log(fields)
        if(rows[0]){
            for(let key of Object.keys(rows[0])) { thKeys.push(key) }
            conn.end()
            return this.result(rows,rows.length,thKeys);
        }else{
            return this.noResult();
        }
    }

    async createTable(sqlStr){
        const conn=await mysql2.createConnection(config.config);
        let call=await conn.execute(sqlStr);
        // console.log(await call)
        conn.end()
        return await call;
    }
}

module.exports={
    // connectDB:connectDB
    SQlFunc:SQlFunc
}
