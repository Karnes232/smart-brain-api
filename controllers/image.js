const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({
    apiKey: '9cc6819b34894474937c7f6a71064ca2'
  });


const handleApiCall = (req, res) => {
    app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    req.body.input
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
    }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => {res.status(400).json('unable to get entries')})
}

module.exports = {
    handleImage, 
    handleApiCall
}