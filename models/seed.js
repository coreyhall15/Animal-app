require('dotenv').config()
const mongoose = require('./connection')
const Animal = require('./animal')


mongoose.connection.on('open', () => {

    // define data we want to put in the database
    const startingAnimals =  [
        { name: "Lion", region: "orange", extinct: false, lifeExpectancy: 1 },
        { name: "Elephant", region: "purple", extinct: false, lifeExpectancy: 1 },
        { name: "Bald Eagle", region: "orange", extinct: false, lifeExpectancy: 1 },
        { name: "Alligator", region: "red", extinct: false, lifeExpectancy: 1 },
        { name: "Tyrannosaurus", region: "brown", extinct: true, lifeExpectancy: 1 },
        { name: "Mammoth", region: "red", extinct: true, lifeExpectancy: 1 },
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