var nodesvm = require("node-svm");
var express = require("express");
var app = express();
app.get("/index.html", function(req, res) {
    res.send("Hello World");
});

var server = app.listen(3000, function() {
    console.log("listening on port %d", server.address().port);
});
console.log ("server listening at port 3000");

var xorProblem = [
  [[0, 0], 0],
  [[0, 1], 1],
  [[1, 0], 1],
  [[1, 1], 0]
];
var svm = new nodesvm.CSVC({
  kernel : nodesvm.KernelTypes.RBF,
  C: 1.0,
  gamma : 0.5
});

svm.once("trained", function(report) {
  [0,1].forEach(function(a) {
    [0,1].forEach(function(b) {
      var prediction = svm.predict([a, b]);
      console.log ("%d XOR %d -> %d", a, b, prediction);
    });
  });
});

svm.train(xorProblem);