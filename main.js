'use strict';

var PORT = 4000;

var http = require('http');
var math = require('./math');
var md5 = require('md5');

var _ = require('lodash');

var server = http.createServer(function(req, res) {
  console.log('method:', req.method);
  console.log('url:', req.url);

  var urlParts = req.url.match(/[^\/]+/g);
  var urlDig = req.url.match(/\d+/g);

  console.log('urlParts:', urlParts)

  switch(urlParts[0]) {
    case 'time':
      var timestamp = Date.now();
      res.end(timestamp + '\n');
      break;
    case 'math':
    console.log("add", urlParts[1] );
      if(urlParts[1] === 'add') {
          var saver = 0;
          var splits = urlDig.forEach(function(x){
              saver += parseFloat(x)
          })

        res.end(saver + '\n');
      }
      else if(urlParts[1] === 'square'){
        var saver = urlDig.map(function(x){
            return parseFloat(x) * parseFloat(x);
        })

      res.end(saver + '\n');
      }
      break;
    case 'gravatar':
      var coder = md5(urlParts[1]);
      console.log(coder)
       var answer ='http://www.gravatar.com/avatar/'+coder;
       res.end(answer+'\n');
      break;
    case 'sentence':
      var mixup = decodeURI(urlParts[1]);
      var letters = 0;
      var words = 0;
       var answer = mixup.split(' ').forEach(function(x){
         words++
         x.split('').forEach(function(y){
           letters++
         })
       })
       var spaces = words - 1;
      //  console.log(letters);
       res.end('{"letters":'+letters+',"spaces":'+spaces+',"words":'+words+'}' + '\n')
    default:
      res.end("nothing");
  }

});

server.listen(PORT, function() {
  console.log('Node server listening on port ' + PORT);
});;

// var x = 4;
//
// var a = 100;
// console.log('x', x);
//
// var sum = require('./sum');
// var path = require(path)
// console.log('after');
//
// console.log(sum(x,a));
// 'uses strict'
//
// var http = require('http');
//
// var server = http.createServer(function(req, res){
//   console.log('method:', req.method);
//   console.log("url", req.url);
//
//
//   switch(req.url) {
//     case '/time':
//       var timestamp = Date.now();
//       res.end(timestamp + '');
//       break;
//     case '/math/add/5/50':
//       var splits = req.url.split('/').reduce(function(acc, x){
//         if(parseInt(x)=== NaN){
//           return;
//         }
//         else{ return acc += parseInt(x)}
//       })
//       res.end(splits + "\n")
//       break;
//     default:
//       res.end('nothing')
//       break;
// }
//
//   server.listen(4000);
// })
