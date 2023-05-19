let createtable=new CreateTable();

// добавляем строку в таблицу
$('add_column').addEventListener('click',e=>createtable.add_column());

// удаляем строку в таблицу
$('remove_column').addEventListener('click',e=>createtable.remove_column());

// проверяет и создаёт таблицу
$('create_btn').addEventListener('click',async e=>createtable.create_btn())


