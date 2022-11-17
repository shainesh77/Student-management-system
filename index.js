const express = require("express");
const app=express();
const parser=require('body-parser');
const mysql=require('mysql');
const { response } = require("express");

var urlcodeparser=parser.urlencoded({extended :false});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/pages/home.html');
    
}); 
app.get('/save',(req,res)=>{
    res.sendFile(__dirname+'/pages/save.html');
});
app.post('/student',urlcodeparser,(req,res)=>{
    
    var data=[req.body.rollno,req.body.name,req.body.eng,req.body.math,req.body.sci];
    var connection=mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password :'',
        database : 'college'
    });

connection.connect();
connection.query('insert into student set rollno=?, name=?, eng=?, math=?, sci=?',data, function(err,result,fields){
    if(err) throw err;
    res.sendFile(__dirname+'/pages/thankyou.html');
});
}); 

app.get('/update',(req,res)=>{
    res.sendFile(__dirname+'/pages/update.html');
    
}); 

app.get('/read',(req,resp)=>{
    var connection=mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password :'',
        database : 'college'
    });

   connection.connect();
   connection.query('select * from student',(err,result)=>{

    if(err){response.send("error");}
    else{ resp.send(result);}
   });
});
app.listen(7000);