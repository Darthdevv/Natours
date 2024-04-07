const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // 1A) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // let query = Tour.find(queryObj);
    // const allTours = await query;

    // const allTours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    console.log(req.query);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));
    // const allTours = await query;

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    // const allTours = await query;

    // 3) Fields Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }
    const allTours = await query;

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

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({
      status: 'success',
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);
    res.status(204).send({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
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
      message: error,
    });
  }
};
