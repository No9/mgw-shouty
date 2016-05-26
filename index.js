'use strict';

// This code has a blatant disregard for errors that may happen...

/**
 * This exported function is the factory for the policy runtime implementation.
 * It is called once during the policy setup phase.
 * @param config - Static configuration information that applies to this policy
 */
module.exports = function (config) {
  console.log('Creating: mgw-shouty');

  // normally, I would do global setup, init and config parsing here,
  // but this policy is too simple for all of that stuff.

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

     for(var i = 0; i < resp.length; i++) {
        if(typeof resp[i] === 'string') {
           resp[i] = resp[i].toUpperCase();
        }

      }
      context.message.body = resp;
      console.log('Invoking mgw-shouty');
      flow.proceed();
    }
}
