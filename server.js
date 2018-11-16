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

const { CLIENT_ORIGIN, DB_URL, PORT } = require('./config');

app.use(
    cors({
        origin: CLIENT_ORIGIN
	})
)

mongoose.connect(DB_URL, { useNewUrlParser: true });

if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('common'));
}   

// app.use(bodyParser.urlencoded({ extended: false }));

// create menu
app.post('/menu', jsonParser, (req, res) => {
    console.log('post menu body: ', req.body)
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

// create menu item(s)
app.post('/menu_items', jsonParser, (req, res) => {
    console.log('menu_item: ', req.body)
    let menuItems = []
    req.body.forEach(item => {
        menuItems.push({
            name: item.name,
            description: item.description,
            cost: item.cost,
        })
    })
    MenuItems.insertMany(menuItems)
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

// Update/Add menu assignment and item comments
// TODO: update so that dupes aren't added
app.put('/menu_items/:id', jsonParser, (req, res) => {
    console.log('Update item req.body: ', req.body) 
    console.log('Update item req.params: ', req.params) 
    // MenuItems.find({ _id: req.params.id })
    MenuItems.update(
        { _id: req.params.id },
        { $push:
            {
                // comments: req.body.comments,
                menus: req.body.menuId
            }
        }
    )
    .then(menuItem => {
        res.status(204).end()
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