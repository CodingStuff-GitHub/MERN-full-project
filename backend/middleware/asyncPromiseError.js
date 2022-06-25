export default (asyncFunction) => (req, res, next) => {
  Promise.resolve(asyncFunction(req, res, next)).catch(next);
};

//Maybe await forever error will be resolved with promise
//'next' here is errorMiddleware
