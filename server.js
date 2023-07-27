require('dotenv').config()
const express=require('express');
const path=require('path');
const ejsMate=require('ejs-mate')
const db=require('./database');

const app=express();

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));//Doubt

app.get('/',(req,res)=>{
    res.render("register")
})
// db.connect((err)=>{
//     if(err){
//         console.log(err);
//     }
//     else{console.log("Database connected successfully!")}
// })
// post 
app.post('/register',async(req,res)=>{
 try {
    const {name,email}=req.body;
    await db.query("insert into ejs.user_table (name,email) values (?,?)",[name,email]);
    return res.json("Okay");
 } catch (error) {
    console.log(error);
    return res.json(error)
 }
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})
