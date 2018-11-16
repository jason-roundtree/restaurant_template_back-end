const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { toJSON: { virtuals: true }})

menuSchema.virtual('menuItems', {
    ref: 'MenuItems',
    localField: '_id',
    foreignField: 'menu'
})

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    cost: Number,
    comments: [String],
    // a menu item can belong to multiple menus
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }]
    // for sub-categorization like Meats, Fish, Pasta, Desserts, etc. Should string be id reference instead?
    // menuSubCategories: [String]
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
const MenuItems = mongoose.model('MenuItems', menuItemSchema)
const ContactInfo = mongoose.model('ContactInfo', contactInfoSchema)
const RestaurantInfo = mongoose.model('RestaurantInfo', restaurantInfoSchema)

module.exports = { Menu, MenuItems, ContactInfo, RestaurantInfo }