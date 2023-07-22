// 声明函数  =>  是return
/**
 * 当实际调用catchAsync时，return 下面的函数 作为 exports.postTour
 *  (req, res, next) => {
     fn(req, res, next).catch((err) => next(err));
    };
 */
//catchAsync = (fn) => (req, res, next) => {
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));
};
