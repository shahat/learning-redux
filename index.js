const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE"; // assign the action type into a variable to avoid miss spelling
const BUY_ICECREAM = "BUY_ICECREAM";
// -----------------------------------------------------------
// =>  step 1 : making action creator function

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux action ",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    //info: "First Redux action ",
  };
}
// -----------------------------------------------------------
//step 2 =>  making a state

const initialCakeState = {
  numberOfCakes: 10,
};
const initialIceCreamState = {
  numberOfIceCream: 20,
};

// -----------------------------------------------------------
// => step 3  =>  making reducer

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

// -----------------------------------------------------------
// => step 4  => making a store

const store = createStore(rootReducer, applyMiddleware(logger));

// print the initial state
// console.log("initial state ", store.getState());
// setup the listener to the state if it changes will print the following

/* 4.1 =>  1 =>  add subscibe to the state
           2 =>  then making dispatch
           3 =>  then unsubscribe 
*/
const listener = () => console.log("update state ", store.getState());
const unsub = store.subscribe(() => {});
// making an action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsub();
