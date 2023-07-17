const Tour = require('../models/tourModel');

// 2) router handlers

exports.getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   data: {
  //     tours: tours,
  //   },
  // });
};

exports.getTourById = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: `no tour can be found by id: ${id}`,
  //   });
  // }
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: tour,
  //   },
  // });
};

exports.patchTour = (req, res) => {
  //TODO: parameter check
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour ....placeholder>',
    },
  });
};

exports.deleteTour = (req, res) => {
  //TODO: parameter check
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.postTour = async (req, res) => {
  try {
    /*   const newTour = new Tour({});
    newTour.save(); */

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
