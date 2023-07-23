const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
});
exports.postUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
exports.getUserById = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
exports.patchUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
