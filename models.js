const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})
// , { toJSON: { virtuals: true }})

// menuSchema.virtual('menuItems', {
//     ref: 'MenuItem',
//     localField: '_id',
//     foreignField: 'menu'
// })

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    cost: Number,
    comments: [String],
    // menu: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Menu'
    // }]
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
    address: [String]
    // contactInfo: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'ContactInfo'
    // }
})


const Menu = mongoose.model('Menu', menuSchema)
const MenuItem = mongoose.model('MenuItem', menuItemSchema)
const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema)
const RestaurantInfo = mongoose.model('RestaurantInfo', restaurantInfoSchema)

module.exports = { Menu, MenuItem, ContactInfo, RestaurantInfo }