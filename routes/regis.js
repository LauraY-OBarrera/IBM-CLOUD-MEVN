const express = require('express');
const router = express.Router();

const Movie = require('../movie');

router.get('/',async (req,res) =>{
  const movie = await Movie.find();
  res.json(movie);
});

router.get('/:title',async (req,res) =>{
const movie = await Movie.find({ title:{'$regex' : req.params.title} });
console.log(req.params.title);

  res.json(movie);
});

router.post('/',async (req,res) =>{
  const movie = new Movie(req.body);
  await movie.save();
  res.json({
    status:'Movie save'
  });
});

router.put('/:id',async (req,res) =>{
  await Movie.findByIdAndUpdate(req.params.id,req.body);
  res.json({
    status:'Movie updated',
  });
});

router.delete('/:id',async (req,res) =>{
  await Movie.findByIdAndDelete(req.params.id);
  res.json({
    status:'Movie delete'
  });
});

module.exports = router;
