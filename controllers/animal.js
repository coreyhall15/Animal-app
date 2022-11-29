const express = require('express')
const Animal = require('../models/animal')


/////////////////////////
//////Create Router

const router = express.Router()//Will have all routes attatched




////////////////////////////////////////////
// Actual Routes
////////////////////////////////////////////
//router.get("/", (req, res) => {
  //  res.send("your server is running... better catch it.")
//})

router.get('/seed', (req, res)=> {
    // define data we want to put in the database
    const startingAnimals =  [
        { name: "Lion", region: "Africa", extinct: false, lifeExpectancy: 1 },
        { name: "Elephant", region: "Africa", extinct: false, lifeExpectancy: 1 },
        { name: "Bald Eagle", region: "United States", extinct: false, lifeExpectancy: 1 },
        { name: "Alligator", region: "United States", extinct: false, lifeExpectancy: 1 },
        { name: "Tyrannosaurus", region: "Africa", extinct: true, lifeExpectancy: 1 },
        { name: "Mammoth", region: "Egypt", extinct: true, lifeExpectancy: 1 },
      ]

      // Delete all animals
      Animal.deleteMany({}, (err, data) => {
        // Create new fruits once old fruits are deleted
        Animal.create(startingAnimals, (err, data) =>{

            console.log(data)
            res.json(data)

        })

      })
})


//Index Routes
router.get('/', (req, res) => {
    //get all fruits from mango and send them back
    Animal.find({}) 
        .then((animals) => {
            //res.json(fruits)
            res.render('animals/index.ejs', {animals})
        })
    
})

// new route
router.get("/new", (req, res) => {
    res.render('animals/new.ejs')
})

//post route
router.post('/' , (req, res) =>{
    req.body.extinct = req.body.extinct === 'on' ? true : false
    Animal.create(req.body, (err, createdAnimal) =>{
        console.log(createdAnimal)
        res.redirect('/animals')
    })
})



// show route to edit
router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id

    // find the particular fruit from the database
    Animal.findById(id, (err, foundAnimal) => {
        console.log(foundAnimal)
        // render the template with the data from the database
        res.render("animals/edit.ejs", {fruit: foundAnimal})
    })
})


//update route
router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // check if the animal is extinct true or false
    req.body.extinct = req.body.extinct === "on" ? true : false
    // update the animal
    Animal.findByIdAndUpdate(id, req.body, {new: true}, (err, updatedAnimal) => {
        // redirect user back to main page when fruit 
        res.redirect(`/animals`)
    })
})

//Get ID route
router.get('/:id', (req, res) => {
   //go and get animal from database
    Animal.findById(req.params.id)
    .then((animal) =>{
        res.render('animals/show.ejs', {animal})
    })
    
})

router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the animal
    Animal.findByIdAndRemove(id, (err, animal) => {
        // redirect user back to index page
        res.redirect("/animals")
    })
})

////////////////////////////////////////
///////Export Router to use in other files
////////////////////////////////////////

module.exports = router