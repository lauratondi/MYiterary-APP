const express = require('express')

const router = express.Router()

const cityModel = require('../model/cityModel')

router.get('/all', (req, res)=> {
    cityModel.find({})
     .then(files => {
         res.send(files)
     })
     .catch(err => console.log(err));
});


router.post('/', (req, res) => {
    const newCity = new cityModel({
        name: req.body.name,
        country: req.body.country
    })
    newCity.save()
      .then(city => {
      res.send(city)
      })
      .catch(err => {
      res.status(500).send("The city already exists in the Database")}) 
});


// router.get('/test', (req, res) => {

//   res.send({ msg: 'Cities test route.' })

// })

module.exports = router