const Tour = require('../models/tourModel');

// 2) router handlers

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,reatingsAverage,summary,difficulty';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    //查询过滤的两种方式
    //1)
    /* const tours = await Tour.find({ duration: '5', difficulty: 'easy' }); */
    //2)
    /* const tours = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('easy'); */
    console.log(req.query);
    //req.query 是一个包含请求参数的对象
    //1)filter
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((excludedField) => delete queryObj[excludedField]);

    //2) advanced query
    //{ duration: { $gte: '5' }, difficulty: 'easy' }
    //{ duration: { gte: '5' }, difficulty: 'easy' }
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );
    let query = Tour.find(JSON.parse(queryString));

    //3) sorting
    if (req.query.sort) {
      const sortby = req.query.sort.split(',').join(' ');
      query = query.sort(sortby);
    } else {
      query = query.sort('-createdAt');
    }

    //4) field limiting
    if (req.query.fields) {
      const limitby = req.query.fields.split(',').join(' ');
      query.select(limitby);
    } else {
      query.select('-__v');
    }

    //5) pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numberTour = await Tour.countDocuments();
      if (skip >= numberTour) {
        throw new Error('This page does not exit');
      }
    }

    const tours = await query;
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.patchTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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
