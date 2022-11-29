
/////////////////////////////////
//////////Fruits Model
////////////////////////////////
const mongoose = require('./connection')

const{Schema, model } = mongoose ///Destructuring grabbing model and Schema off mongoose

///Make fruit Schema
const animalSchema = new Schema({
    name: String,
    region: String,
    extinct: Boolean,
    lifeExpectancy: Number,
})

//make Animal
const Animal = model("Animal", animalSchema)


////Export Model
module.exports = Animal