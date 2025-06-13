const express=require("express");
const app = express();
const bodyParser=require("body-parser");
const PORT=3000;
const path=require('path');
const mongoose=require('mongoose');
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb://127.0.0.1:27017/signinHDB')

app.use(express.json());

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
})
const User=mongoose.model('User',userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'signin.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});
app.get('/',(req,res)=>{
    res.send("");
});

app.post('/signin',async(req,res)=>{
    const {name,email,password}=req.body;
    const newUser=new User({name,email,password})

    try{
        await newUser.save();
        res.send("user Saved successfully");
    }catch(error){
        console.error("error saving the file",error)
        res.status(500).send("error found")
    }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await user.findone({email})
        if(!user){
            return res.status(401).send("user not found")
        }
        if(user.password!==password){
            return res.status(401).send("Incorrect password");
        }
         //res.send("login successful")
         res.redirect('/home');
    }catch(error){
        console.log("error found",error)
        res.status(500).send("Server error");
    }
});
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});