const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1) middleware

app.use(morgan('dev'));
//express.json()  middleware
app.use(express.json());
//自定义 middleware
app.use((req, res, next) => {
  console.log('hello from middleware 👍');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) router handlers

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTourById = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: `no tour can be found by id: ${id}`,
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

const patchTour = (req, res) => {
  //TODO: parameter check
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour ....placeholder>',
    },
  });
};

const deleteTour = (req, res) => {
  //TODO: parameter check
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const postTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//TODO: need implements
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
const postUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
const getUserById = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
const patchUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
/* app.get('/api/v1/tours', getAllTours);
app.get('/api/v1/tours/:id', getTourById);
app.patch('/api/v1/tours/:id', patchTour);
app.delete('/api/v1/tours/:id', deleteTour);
app.post('/api/v1/tours', postTour); */

// 3) routes

app.route('/api/v1/tours').get(getAllTours).post(postTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(patchTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(postUser);
app
  .route('/api/v1/user/:id')
  .get(getUserById)
  .patch(patchUser)
  .delete(deleteUser);
// 4) start server

const port = 3000;
app.listen(port, () => {
  console.log(`server is listening on port: ${port} `);
});
