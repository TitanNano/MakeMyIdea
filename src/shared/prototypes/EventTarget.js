
/**
 * @typedef Listener
 * @property {string} type
 * @property {ListenerFunction} fn
 */

/**
 * @callback ListenerFunction
 * @param {Object} event
 * @this EventTarget
 */

/** @lends EventTarget.prototype */
let EventTarget = {

    /**
     * Holds all the event Listeners for this EventTarget.
     *
     * @type Listener[]
     */
    _listeners : null,

    /**
     * Instantiates the _listeners array.
     */
    _make : function(){

    },

    /**
     * Registers a new event listener for an specified event type.
     *
     * @param {string} type - The type of event this function wants to listen to.
     * @param {function} fn - the function to call when this event fires
     */
    on : function(type, fn) {

    },

    /**
     * Emits a new event which will be sent to all event listeners.
     * The listener execution should happen async.
     *
     * @param {string} type - the type of event to emit
     * @param {Object} data - any type of Object
     */
    emit : function(type, data){

    }

};

export default EventTarget;
