import { Make } from 'modules/make.js';
import Logger from 'prototypes/Logger.js';

let logger = Make(Logger)('EventTarget');

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
        this._listeners = {};
    },

    /**
     * Registers a new event listener for an specified event type.
     *
     * @param {string} type - The type of event this function wants to listen to.
     * @param {function} fn - the function to call when this event fires
     */
    on : function(type, fn) {
        if (typeof this._listeners[type] == 'undefined'){
            this._listeners[type] = [];
        }

        this._listeners[type].push(fn);
        logger.log('New Listener: ', this._listeners)
    },

    /**
     * Emits a new event which will be sent to all event listeners.
     * The listener execution should happen async.
     *
     * @param {string} type - the type of event to emit
     * @param {Object} data - any type of Object
     */
    emit : function(type, data=null){
        logger.log('Listener call: ', type)
        if (this._listeners[type] instanceof Array){
            var listeners = this._listeners[type];
            listeners.forEach(listener => {
                setTimeout(() => listener.apply(this, [data]), 0);
            });
        }
    }

};

export default EventTarget;
