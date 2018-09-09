const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    uppercase: true
  }
}));

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();

  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    }, {
      new: true
    });
    res.send(genre);
  } catch (error) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

});

router.delete('/:id', async (req, res) => {

  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    res.send(genre)
  } catch (error) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

});
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
  } catch (error) {
    return res.status(404).send('The genre with the given ID was not found.');
  }

});

function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
}

module.exports = router;