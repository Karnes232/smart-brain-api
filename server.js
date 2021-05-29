const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-transparent-72197',
      user : 'karnes',
      password : 'Wxtbbi232',
      database : 'smart-brain'
    }
  });

const app = express();
const PORT = process.env.PORT || 2000

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => { res.send("Hello World") })
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image/', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl/', (req, res) => { image.handleApiCall(req, res)})


app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})

/*

/ --> res = this is working
/signin --> POST = success / fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/