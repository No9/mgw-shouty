'use strict';

/**
 * This exported function is the factory for the policy runtime implementation.
 * It is called once during the policy setup phase.
 * @param config - Static configuration information that applies to this policy
 */
module.exports = function (config) {

  // Do global init and config parsing here,

  /**
   * This is the policy runtime implementation, it gets called each time the
   * policy is enforced.
   * @param props - property values as defined in policy.yml
   * @param context - context values as defined by context.md
   * @param flow - the flow object has utility methods (logger, subscribe, and unsubscribe)
   *               and flow control methods (proceed, fail, and stop). The flow.proceed()
   *               method must be called to enforce the next policy in the assembly.
   */
    return function (props, context, flow ) {
     
     var resp = JSON.parse(context.message.body.toString());
     if(!Array.isArray(resp)) {
        var typeErr = {
            name : 'FlowTypeError',
            message: 'The type in message.body is not an Array'
        }
        flow.fail(typeErr);
        return true;
     }

     for(var i = 0; i < resp.length; i++) {

        if(typeof resp[i] === 'string') {
           resp[i] = resp[i].toUpperCase();
        } else {
        var elementErr = {
            name : 'FlowTypeError',
            message: 'The type of elements in message.body Array are not strings'
        }
      
           flow.fail(elementErr);
           return true;
        }
      
      }
      context.message.body = resp;
      flow.proceed();
    };
}
