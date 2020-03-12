/** 
 * @typedef {Object} Redux 
 * @property {(Reducer, [PreloadedState], [Enhancer]) => Store} createStore - Creates a Redux store that holds the state tree
 * @property {Function} applyMiddleware
 * @property {Function} combineReducers
 * @property {Function} bindActionCreators
 */

/**
 * @typedef {Object} Store;
 * @property {(Listener) => {Unsubscribe} } subscribe - Adds a change listener.
 * - It will be called any time an action is dispatched,
 * - May then call `getState()` to read the current state tree inside the callback.
 * @property {(Dispatch) => null} dispatch - Dispatches an action. It is the only way to trigger a state change.
 * @property {() => State} getState - Reads the state tree managed by the store.
 * @property {Function} replaceReducer
 */

/**
 * Plain object representing “what changed”.
 * @typedef {Object} Action
 * property {string} type
 * property {*} []
 */

/**
 * @typedef {() => Function} Listener A callback to be invoked on every dispatch.
 */

/**
 * @typedef {Function} Reducer A function that returns the next state tree, given the current state tree and the action to handle.
 */

/**
 * @typedef {Object} PreloadedState The initial state. You may optionally specify it to hydrate the state from the server in universal apps, or to restore a previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be an object with the same shape as `combineReducers` keys.
 */

/**
 * @typedef {Function()} Enhancer The store enhancer. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is `applyMiddleware().
 */

/**
 * @typedef {Function(String):Action} ActionCreator
 */

/**
 * Unsubscribe
 * @typedef {Function():Function } Unsubscribe
 */

/**
 * @typedef {Function(Action):Action} Dispatch
 */


/** 
 * @typedef {Object} State 
 * @property {String} activePartcode - active partcode
 * @property {Boolean} devMode
 * @property {Boolean} isEditing 
 * @property {Label} activeLabel - should be enum
 */


/** @type {State} */
const defaultState = {
  devMode: false,
  isEditing: false,
  activePartcode: '00039',
  selectedLabelGroup: '',
  labelGroups: '',
  pendingLabelGroup: new Map(),
  selectedLabel: ''
  // {
  //   prefix: {
  //     name: 'LBX',
  //     desc: 'Enzymatic Therapy older design box',
  //     type: 'CARTON'
  //   },
  //   partcode: '00039',
  //   bulk: null,
  //   version: 'N02',
  //   context: 'Dr Choice Manly 90 tabs (G)',
  //   extension: 'pdf',
  //   name: 'LBX00039.N02 This is the name.pdf',
  //   meta: {
  //     META_LABEL_ASSET_TYPE: 'CARTON', // LABEL, CARTON, BLISTER
  //     META_LABEL_UPDATED_DATE: 'Hum', // from file properties
  //     META_LABEL_CREATED_BY: 'Hex', // from file properties
  //     LABEL_PDF_PENDING: 'Hilbert',
  //     LABEL_PDF_ACTIVE: 'Hey',
  //   }
  // }
};

export default defaultState;

