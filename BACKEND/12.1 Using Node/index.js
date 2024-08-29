const fs= require("fs");    // fs is sile system built in module for file operations

// fs.writeFile("message.txt","My name is amardeep !",(err)=>{
//     if(err) throw err;

//     console.log("file has been saved ");
// })

fs.readFile("message.txt","utf-8",(err,data)=>{    // 1st param -> file name , 2nd encoding , callback if any error 
    if(err) throw err;
    console.log(data);
});