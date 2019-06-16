const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: setup schemas so that menu names are accessible or populated from menuItemSchema
const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { toJSON: { virtuals: true }})

menuSchema.virtual('menuItems', {
    ref: 'MenuItems',
    localField: '_id',
    foreignField: 'menus'
})


const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    cost: Number,
    comments: [String],
    menus: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    }]
    // TODO: for sub-categorization like Meats, Fish, Pasta, Desserts, etc. Should sub-category be it's own schema?
    // menuSubCategories: [[{
    //     type: Schema.Types.ObjectId,
    //     ref: 'SubMenuCategory'
    // }]
})

const orderItemSchema = new Schema({
    menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    },
    specialRequest: String,
    quantity: Number
})

const specialRequestSchema = new Schema({
    menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    },
    specialRequests: String
})

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    itemsOrdered: [{
        type: Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    preTaxCost: {
        type: Number,
        required: true
    },
    totalTax: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now,
        required: true
    }
})

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }    
})

const restaurantContactInfoSchema = new Schema({
    phone: [{
        type: Number,
        required: true
    }],
    // string of links to social media
    social: [String],
    // email: [String],
})

const restaurantInfoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: [String],
    daysOpen: [{
        type: String,
        required: true
    }],
    hoursOpen: [{
        type: String,
        required: true
    }]
    // contactInfo: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'ContactInfo'
    // }
})

const Menu = mongoose.model('Menu', menuSchema)
const MenuItems = mongoose.model('MenuItems', menuItemSchema)
const OrderItem = mongoose.model('OrderItem', orderItemSchema)
const Order = mongoose.model('Order', orderSchema)
const SpecialRequest = mongoose.model('SpecialRequest', specialRequestSchema)
const Customer = mongoose.model('Customer', customerSchema)
const ContactInfo = mongoose.model('RestaurantContactInfoSchema', restaurantContactInfoSchema)
const RestaurantInfo = mongoose.model('RestaurantInfo', restaurantInfoSchema)

module.exports = { Menu, MenuItems, ContactInfo, RestaurantInfo, OrderItem, Order, SpecialRequest, Customer }