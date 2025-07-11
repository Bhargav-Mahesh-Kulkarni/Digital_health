const express=require("express");
const app = express();
const bodyParser=require("body-parser");
const PORT = 10000;

const path=require('path');
const mongoose=require('mongoose');
app.use(express.urlencoded({extended:true}));
mongoose.connect('mongodb://127.0.0.1:27017/userDataSaveDB')
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "../views"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

const userSchema=new mongoose.Schema({
    
    email:String,
    password:String,
    role:String,
    fullName:String,
    DOB:String,
    gender:String,
    bloodGroup:String,
    allergies:String,
    diseases:String,
    EmergencyContact:String,
    historyList:[],
    medicationList:[],
    photo:String,

    previousDoctors: [
    {
      doctorEmail:String,
      doctorName: String,
      doctorContact: String,
      visitDate: Date
    }
   ] 
})
const User=mongoose.model('User',userSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.html'));
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..','public','login.html'));
   });

/*app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname,'..','public','register.html'));
   });*/
 /*  app.get('/profile', async (req, res) => {
  try {
    const user = await User.findOne().sort({ _id: -1 }); // latest user
    if (!user) return res.send("No user found");
    res.render('profile', { User: user }); // send to view
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading profile");
  }
});
*/

app.get("/history/:email", async (req, res) => {
  const userEmail = req.params.email;

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // 👇 Renders the EJS file with user's email and history
    res.render("history", {
      email: user.email,
      historyList: user.historyList
    });

  } catch (err) {
    console.error("Error loading history:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/save',async(req,res)=>{
    const {email,fullName,DOB,gender,bloodGroup,allergies,diseases,EmergencyContact,doctorEmail,doctorName,doctorContact,visitDate}=req.body;
    const newUser=new User({email,fullName,DOB,gender,bloodGroup,allergies,diseases,EmergencyContact,doctorEmail,doctorName,doctorContact,visitDate})

    try{
        await newUser.save();
        res.send("user Saved successfully");

    }catch(error){
        console.error("error saving the file",error)
        res.status(500).send("error found")
    }
});

app.post('/update', async (req, res) => {
    const { email, fullName, DOB, gender, bloodGroup, allergies, diseases, EmergencyContact } = req.body;

    console.log("Update Request Body:", req.body); // 🪵 Debug

    if (!email) {
        return res.status(400).send("Email is required to update profile.");
    }

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).send("User not found");
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { fullName, DOB, gender, bloodGroup, allergies, diseases, EmergencyContact },
            { new: true }
        );

        res.send("User updated successfully");
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
});
    
app.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    const newUser=new User({email,password})

    try{
        await newUser.save();
        res.send("user Saved successfully");

    }catch(error){
        console.error("error saving the file",error)
        res.status(500).send("error found")
    }
});
   
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).send("user not found")
        }
        if(user.password!==password){
            return res.status(401).send("Incorrect password");
        }
        if(user.role=="Patient"){
        res.render("home",{User:user});
        }
        if(user.role=="Doctor"){
        res.render("doctorchoice");
        }
    }catch(error){
        console.log("error found",error)
        res.status(500).send("Server error");
    }
});
app.get('/', async (req, res) => {
  const user = await User.findOne().sort({ _id: -1 }); // latest user
  if (!user) return res.send("No user found in DB");
  res.render('profile', { User: user });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

