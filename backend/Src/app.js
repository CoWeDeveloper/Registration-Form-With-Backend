const { hasSubscribers } = require("diagnostics_channel");
const express = require ("express");
const path = require("path");
const hbs = require("hbs")
const app = express();
require("../Src/db/conn")
const Classroom = require("../Src/models/register") 

const port = process.env.PORT || 3000
app.use(express.json());
app.use(express.urlencoded({extended : false} ));

const static_path = path.join(__dirname, "../public"); 
const template_path =  path.join(__dirname, "/templates/views");
const partials_path =  path.join(__dirname, "/templates/partials");

app.use(express.static(static_path));
app.set("views", template_path);
app.set('view engine', 'hbs');
hbs.registerPartials(partials_path );


app.get("/", (req,res)=>{
    res.render("index")
});


app.get("/login", (req,res)=>{
    res.render("login")
})

app.get("/register", (req,res)=>{
    res.render("register")
})
app.post("/register", async(req,res)=> {
    try{
        const password =req.body.password;
        const cpassword = req.body.confirmpassword;
        console.log()
        if (password == cpassword){
            const register = new Classroom({
                FirstName : req.body.FirstName,
                LastName : req.body.LastName,
                Email: req.body.Email,
                Age :req.body.Age,
                Department :req.body.Department,
                gender :req.body.gender,
                password:password,
            
            })
            const registered  = await register.save();
            console.log(registered)
            console.log("From has been submit")
            res.status(201).render("index")
        }
        else{
            res.send("Password is not matching")
        }

    }
    catch{(e)=>{
        console.log(e)
    }}
})

app.post("/login", async(req, res)=>{
    try{
        const Email = req.body.Email;
        const password = req.body.password;
        const useremail = await Classroom.findOne({Email});
       
        
        if (useremail.password == password ){
           res.status(201).render("index",`${useremail.FirstName} you have been successfully login`)
           console.log("Login successfully")
           res.alert(`${useremail.FirstName} ${useremail.LastName} you have been successfully login`)
        }
        else{
            res.send("Password is invalid")
        }

    }
    catch{

    }
})


app.listen(port,()=>{
    console.log(`Server start on ${port}`);
})