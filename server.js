const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')
const morgan = require('morgan')

const { 
    Menu, 
    MenuItems, 
    ContactInfo, 
    RestaurantInfo
} = require('./models')

const { CLIENT_ORIGIN, DB_URL, PORT } = require('./config')

app.use(
    cors({
        origin: CLIENT_ORIGIN
	})
)

mongoose.connect(DB_URL, { useNewUrlParser: true })

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('common'))
}   

app.use(bodyParser.urlencoded({ extended: false }));

// TODO: move routes to their own module
// create menu
app.post('/menu', jsonParser, (req, res) => {
    Menu.create(req.body)
        .then(menu => {
            res.status(201).json(menu)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// get all menus
app.get('/menus', (req, res) => {
    Menu.find()
        .then(menu => {
            res.status(200).json(menu)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// get menu by id
app.get('/menu/:id', (req, res) => {
    Menu.findById(req.params.id)
        .populate('menuItems')
        .then(menu => {
            res.status(200).json(menu)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// create menu item
app.post('/menu_items', jsonParser, (req, res) => {
    // console.log('menu_items post req: ', req)
    const menuItem = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        menus: req.body.menus,
        editable: false
    }
    MenuItems.create(menuItem)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// get all menu items
app.get('/menu_items', (req, res) => {
    MenuItems.find()
        .then(item => {
            res.status(200).json(item)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// Update menu item
app.put('/menu_items/:id', jsonParser, (req, res) => {
    MenuItems.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { returnNewDocument: true }
    )
    .then(menuItem => {
        res.status(204).json(menuItem)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})


// update menu name
// update menu item(s)
// delete menu
// delete menu item(s)
// update contact info
// delete contact info
// update restaurant info
// create new user
// update user (name, email, reset password, active/inactive/permissions)
// delete user



let server

function runServer() {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`)
            resolve(server)
        })
        .on('error', err => {
            reject(err)
        })
    })
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server')
        server.close(err => {
            if (err) {
                reject(err)
                return
            }
            resolve()
        })
    })
}

if (require.main === module) {
    runServer().catch(err => console.log(err))
}

module.exports = { app, runServer, closeServer }