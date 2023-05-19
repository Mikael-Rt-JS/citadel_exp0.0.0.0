class CreateTable{
    Tr=`<tr class="dat">
<td>
    <input type="" placeholder="" name="name" id="" class="name"/>
</td>
<td>
    <select name="type" class="type">
        <option value="INT" selected>INT</option>
        <option value="VARCHAR">VARCHAR</option>
        <option value="TEXT">TEXT</option>
        <option value="DATE">DATE</option>
        <option value="JSON">JSON</option>
        <option value="TIMESTAMP">TIMESTAMP</option>
        <option value="BOOLEAN">BOOLEAN</option>
        <option value="BIGINT">BIGINT</option>
        <option value="LONGTEXT">LONGTEXT</option>
        <option value="SERIAL">SERIAL</option>
    </select>
</td>
<td>
    <input type="number" placeholder="" name="length" id="" class="length"/>
</td>
<td>
    <input type="checkbox" placeholder="" name="auto_increment" id="" class="auto_increment"/>
</td>
<td>
    <select name="index" class="index">
        <option value="---" selected>---</option>
        <option value="PRIMARY KEY">PRIMARY</option>
        <option value="UNIQUE">UNIQUE</option>
        <option value="INDEX">INDEX</option>
        <option value="FULLTEXT">FULLTEXT</option>
        <option value="SPATIAL">SPATIAL</option>

    </select>
</td>
</tr>
`;

    // отправляет запрос на создание таблицы
    async create(data){
        let response=await post('/create_table',data).then(data=>data)
        if(await response){
            console.log(response.name)
        }
    }

    // рисует новую строку для настройки колонки таблицы
    add_column(){
        $("crateFieldTBody").innerHTML+=this.Tr
    }

    remove_column(){
        let tags=$("crateFieldTBody").children;
        if(tags.length){
            tags[tags.length-1].remove()
        }else{
            alert('Отсутствует элемент для удаление!\nThere is no item to delete!')
        }
    // https://monsterlessons.com/project/lessons/dobavlenie-i-udalenie-dom-elementov
    }

    create_btn(){
        let tablename=$('tablename').value
        let dat=[];
        let name=[];
        let type=[];
        let length=[];
        let index=[];
        // let auto_incremen=[];

    
        if(!tablename){
            alert('Отсутствуют имя таблицы!\nTable name missing!')
        }else{
            if($("crateFieldTBody").children.length){
                dat=document.querySelectorAll('.dat')
                name=document.querySelectorAll('.name')
                type=document.querySelectorAll('.type')
                length=document.querySelectorAll('.length')
                let auto_increment=document.querySelectorAll('.auto_increment')
                index=document.querySelectorAll('.index')
                let newTable={
                    tableNewName:tablename,
                    tableColumns:[]
                }
                // console.dir(dat)
                for(let i=0;i<dat.length;i++){
                    newTable.tableColumns.push({
                        name: name[i].value,
                        type: type[i].value,
                        length:length[i].value,
                        auto_increment: auto_increment[i].checked ? 1 : 0,
                        index: index[i].value
                    })
                    l(name[i].value,type[i].value,length[i].value,auto_increment[i].checked,index[i].value)
    
    
                }
                l(newTable)
                this.create(newTable)
                // l(name, type,length,auto_increment,index)
        
            }else{
                alert('Отсутствуют поля!\nMissing fields!')
            }
        }
    }
}
