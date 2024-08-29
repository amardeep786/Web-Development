const express = require( "express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const { type } = require("os");
const mongoose = require("mongoose")

const app = express();
const port = 8000;

// connection

mongoose.connect('mongodb://127.0.0.1:27017/my-first-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});


// ye hmara schema bann gya h abb
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,   // mandatory hai first name
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
},{timestamps:true});

// ab iss schema ka model bnana h , user name h model ka(ie databse m users dikhega) and User is class
const User = mongoose.model("user",userSchema);


//middleware -- but assume as plugin for now
app.use(express.urlencoded({extended:false}));

app.get("/users" , async (req,res)=>{
    
    // ye hme browser p html element ki treh name deta tha 

    /*
        const html = `
        <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join('')}
        </ul>`;

    */

    // gives all DB users
    const allDbUsers = await User.find({});
    
        const html = `
        <ul>
        ${allDbUsers.map(user => `<li>${user.firstName}-${user.email}</li>`).join('')}
        </ul>`;

    res.send(html);
})

//REST API

// sending users in json format
app.get("/api/users" , async (req,res)=>{
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

// getting users data by id 

// ab isi route p  hme new user add krna h , delete b krna h to 
// hum 3 baar same app.post or app.delete krk likh lenge 

// another way is app.route(yaha p route likhdo).get(to get wala chlega ).delete(to del wla )and so on

// methd 1 : 
// app.get("/api/users/:id" , (req,res)=>{
    
//     const id = Number(req.params.id);
//     const user = users.find((user)=> user.id === id);
//     res.send(user);
// });

// method 2 : 

app.route("/api/users/:id").get( (req,res)=>{
    
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    res.send(user);
})
.patch((req,res) =>
{
    // edit user with id 
    return res.json({status : "Pending"});
})
.delete((req,res) =>
    {
        // delete user with id 
        return res.json({status : "Pending"});
    })


// post request ie create user
app.post("/api/users",async (req,res)=>{

    // jo bhi frontend s data aaega wo req . body s body m aajaega
    const body = req.body;
    // console.log("Body",body); -> to print on console

    if(
        !body || !body.first_name || !body.last_name
        || !body.email || !body.gender || !body.job_title
    ){
        return res.status(400).json({msg:"All fields are req..."});
    }

    // --------- abhi hum file m nai push krna chah rhe ab hum database m push krege------------

    // users.push({...body,id : users.length + 1});
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>
    // {
    //     return res.json({status:"success" , id : users.length});
    // });

    // ------- upr wla code file m push krne k liye hai ------------------------------

    const result = await User.create({
        firstName : body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title

    });

    console.log("result",result);
    return res.status(201).json({msg:"successfully inserted"});
});





app.listen(port , ()=> console.log(`Server started at port : ${port}`))