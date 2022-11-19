require("dotenv").config() // load env files
const express = require('express') //bring in express to make our app
const morgan = require('morgan') // nice ledger for our request
methodOverride = require('method-override')
const mongoose = require('mongoose') // gives us that db connection and cool methods for CRUD
const PORT = process.env.PORT

const app = express()

/////////////////////////////////
//////////Database Connection
/////////////////////////////////

const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}


//Establish our connection
mongoose.connect(DATABASE_URL, CONFIG);

// Log connction events from mongoose
mongoose.connection
    .on("open", ()=> console.log('Mongoose connected'))
    .on("closed", ()=> console.log('Mongoose disconnected'))
    .on("error", ()=> console.log('Mongoose error, error'))


/////////////////////////////////
//////////Fruits Model
////////////////////////////////

const{Schema, model } = mongoose ///Destructuring grabbing model and Schema off mongoose

///Make Animal Schema
const animalSchema = new Schema({
    species: String,
    location: String,
    extinct: Boolean,
    lifeExpectancty: Number,
})

//Make Animal
const Animal = model("Animal", animalSchema)


/////////////////////////////////
///Middleware
/////////////////////////////////

app.use(morgan("tiny"))//logging
app.use(methodOverride("_method"))//override for put and delete requests from forms
app.use(express.urlencoded({extended: true}))//parse urlencoded request bodies
app.use(express.static("public"))//use static files in a public directory



////////////////////////////////////////////
// Routes
////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it.")
})

app.get('/animals/seed', (req, res)=> {
    //define data we want in the folder
    const startingAnimals = 
    [
        { species: "Lion", location: "Africa", extinct: false, lifeExpectancty: 23 },
        { species: "Elephant", location: "Africa", extinct: false, lifeExpectancty: 65 },
        { species: "Tyrannosarurs", location: "Alaska", extinct: true, lifeExpectancty: 28 },
        { species: "Lion", location: "Canada", extinct: false, lifeExpectancty: 35 },
      ]
    
      //Delete all Animals
      Animal.deleteMany({}, (err, data) => {
        //create new Animals
        Animal.create(startingAnimals, (err, data)=> {
            res.json(data)
        })
      })
})


//Index Routes
app.get('/animals', (req, res) => {
    //get all animals from mango and send them back
    Animal.find({}) 
        .then((animals) => {
            //res.json(fruits)
            res.render('animals/index.ejs', {animals})
        })
    
})

// new route
app.get("/animals/new", (req, res) => {
    res.render('animals/new.ejs')
})

//post route
app.post('/animals' , (req, res) =>{
    req.body.extinct = req.body.extinct === 'on' ? true : false
    Animal.create(req.body, (err, createdAnimal) =>{
        console.log(createdAnimal)
        res.redirect('/animals')
    })
})

app.get('/fruits/:id', (req, res) => {
   //go and get fruit from database
    Animal.findById(req.params.id)
    .then((animal) =>{
        res.render('animals/show.ejs', {animal})
    })
    
})

////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////

app.listen(PORT, () => console.log('Bands will make her dance on port: ${PORT}'))