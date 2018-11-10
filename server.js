const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const mongoose = require('mongoose')
const morgan = require('morgan')

const { 
    Menu, 
    MenuItem, 
    ContactInfo, 
    RestaurantInfo
} = require('./models')

const { CLIENT_ORIGIN, DB_URL, PORT } = require('./config');

mongoose.connect(DB_URL, { useNewUrlParser: true });

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('common'));
}   

app.use(bodyParser.urlencoded({ extended: false }));

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
    console.log('req.body: ', req.body)
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
        .then(menu => {
            res.status(200).json(menu)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// create menu item(s)
app.post('menu/:id', jsonParser, (req, res) => {
    const menuItem = {
        menu: req.params.id,
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        comments: req.body.comments
    }
    MenuItems.create(menuItem)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

// update menu
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