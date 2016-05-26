var test = require('tape').test;
var Policy = require('../');
var p = Policy();

test('policy is called', function(t) {
   t.plan(1);
   var flow = {};
   flow.proceed = function() {
      t.ok('Proceed Called');
   };
   var b = new Buffer('["this is a test"]') ;  
   var context = { message : {
         body : b
      }
   };

   p({}, context, flow);
});
