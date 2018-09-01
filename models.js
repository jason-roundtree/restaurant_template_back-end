const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    cost: Number,
    comments: [String],
})

const contactInfoSchema = new Schema({
    phone: [{
        type: Number,
        required: true
    }],
    email: [String],
    social: [String],
    operational: [{
        type: String,
        required: true
    }]
})

const restaurantInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: [String],
    // add reference to contact info schema??
})

const Menu = mongoose.model('Menu', menuSchema)
const MenuItem = mongoose.model('MenuItem', menuItemSchema)
const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema)
const RestaurantInfo = mongoose.model('RestaurantInfo', restaurantInfoSchema)

module.exports = { Menu, MenuItem, ContactInfo, RestaurantInfo }