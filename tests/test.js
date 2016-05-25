var test = require('tape').test;
var Policy = require('../');
var p = Policy();

test('policy is called', function(t) {
   t.plan(1);
   var flow = {};
   flow.proceed = function() {
      t.ok('Proceed Called');
   }
   
   var context = {};
   context.state = { "test" : "this should be loud" };

   p({}, context, flow);
      }
});
