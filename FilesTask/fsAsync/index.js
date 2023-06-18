const fs = require('fs')

// fs.writeFile('file.txt','Banglore is the silicon valley of India.',
//      (err)=>{
//         console.log('asynchronus task are executed')
// })


// fs.appendFile('file.txt'," There are plenty of oppourtunities in Banglore",(err)=>{
//        console.log('Data is added into the file');
// })


fs.readFile('file.txt',"UTF-8",(err,data)=>{
      console.log(data);
})