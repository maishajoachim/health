require("dotenv").config({ path: "./config.env" });
const express = require('express');
const path = require('path');
const collection = require('./config');
const bcrypt = require('bcryptjs');

const app = express();
// convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

//use EJS as the view engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));
//app.use(express.static("frontend"));
app.get('/', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

// register user
app.post('/signup', async (req, res) => {
  const data ={
    name: req.body.username,
    password: req.body.password
  }

  //check if user is already registered
  const existingUser = await collection.findOne({name: data.name});

  if(existingUser) {
    res.send("user already axists. Please choose a different username.")
  }
  else{
    //hash the password using bcrypt
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashPassword; // replace the hash password with original password
    const userdata = await collection.insertMany(data);
    console.log(userdata);
  }

  //login users
  app.post('/login', async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            res.send("user name cannot found");
        }

        // comparing the hash password from database with a plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch) {
            res.render("index");
        } else {
            req.send("wrong password");
        }
    }catch{
        res.send("wrong Details");
    }
  });

});


const PORT = process.env.PORT;
app.listen(port, () => {
    console.log('server running on port:' + port);
})