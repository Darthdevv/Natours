const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const allTours = await Tour.find();

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: allTours.length,
      data: { allTours },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const tour = await Tour.findById(id);
    // const tour = await Tour.findOne({ _id: id });

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { tour },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTour = (req, res) => {
  res.status(201).send({
    status: 'success',
    // data: updatedTour,
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).send({
    status: 'success',
    data: null,
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).send({
      status: 'success',
      data: newTour,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
