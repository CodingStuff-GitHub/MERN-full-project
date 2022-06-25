const onSuccess = (data) => {
  console.log(data);
};
const onRejected = (data) => {
  console.log(data);
};
var promise = new Promise(function (resolve, reject) {
  let a = 1;
  if (a != 1) {
    resolve("Success");
  } else {
    reject("Error");
  }
});

promise.then(onSuccess).catch(onRejected);
