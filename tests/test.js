var test = require('tape').test;
var Policy = require('../');
var p = Policy();

test('policy is called', function(t) {
   t.plan(2);
   var flow = {};
   flow.proceed = function() {
      t.ok(true, 'Proceed Called');
   };
   var b = new Buffer('["this is a test"]') ;  
   var context = { message : {
         body : b
      }
   };

   p({}, context, flow);
   t.equal(context.message.body[0], 'THIS IS A TEST', 'Uppercase test');
});

test('non array in the body throws', function(t) {
  t.plan(2);
  var flow = {};

  flow.fail = function(err) {
     t.equal(err.name, 'FlowTypeError', 'Error type');
     t.equal(err.message, 'The type in message.body is not an Array');
  };
  var context = { message : {
         body : 123
      }
  };

  p({}, context, flow);  

});

test('non string in the array throws', function(t) {
  t.plan(2);
  var flow = {};

  flow.fail = function(err) {
     t.equal(err.name, 'FlowTypeError', 'Error type');
     t.equal(err.message, 'The type of elements in message.body Array are not strings');
  };
  var b = new Buffer("[123]");
  var context = { message : {
         body : b
      }
  };

  p({}, context, flow);  

});
