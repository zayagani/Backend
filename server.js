var express=require('express')
var app=express();
const port=3005;
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
//let det=requre('./')


mongoose.connect('mongodb://localhost:27017/Learn')
var db=mongoose.connection;
db.on('error',console.log.bind('eror'))
db.once('open',function(callback){
console.log("sucess")
})

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))


app.post('/signup',function(req,res){

var name=req.body.name;
var email=req.body.email;
var password=req.body.password;

var data={
    name:name,
    email:email,
    password:password
}
db.collection('detail').insertOne(data,function(err,result){
if (err) {
    console.log("error")
  res.json(err)
}else{
    if(req.body.email==null){
        console.log("fail")
res.status(400).json(err)
    }else{
        console.log("succes insert",req.body.email)
        res.status(200).json(data)
    }
    
}
//res.send(data)
//console.log(data)
});

})



app.get('/home',function(req,res){

    db.collection('detail').find({},function(err,data){
res.json(data)

    })
//res.send("hello world")

});


app.get('/',function(req,res){
res.send("hello data")
})


app.get('/profile',function(req,res){

res.send("profile data")
});
app.listen(port,function(){

    console.log(`server started at ${port}`)
})