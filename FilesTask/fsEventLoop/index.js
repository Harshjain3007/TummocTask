const fs = require('fs')


// fs.mkdir('asynchronus',(err)=>{
//     console.log('folder created');
// })

fs.writeFile('asynchronus/file.txt','Banglore is an awsome city.',(err)=>{
    if(err){
        console.log(err);
    }
          console.log('new file created');
})

fs.appendFile('asynchronus/file.txt',' There are many oppourtunities in Banglore',(err)=>{
    if(err){
        console.log(err);
    }
        console.log('new information added')
})


fs.readFile('asynchronus/file.txt','utf-8',(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data);
})

fs.rename('./asynchronus/file.txt','./asynchronus/myfile.txt',(err)=>{
    if(err){
        console.log(err);
    }
    console.log('file name changed');
})