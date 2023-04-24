const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE"; // assign the action type into a variable to avoid miss spelling

// -----------------------------------------------------------
// =>  step 1 : making action creator function

function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First Redux action ",
  };
}
// -----------------------------------------------------------
//step 2 =>  making a state

const initialState = {
  numberOfCakes: 10,
};

// -----------------------------------------------------------
// => step 3  =>  making reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      // retuen the new state
      // note that in reality you state contains many prop so you should make a copy of your state then change only the prop that need to change
      // the ...state make the reducer change only the numberOfCakes

      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };
    default:
      return state;
  }
};

// -----------------------------------------------------------
// => step 4  => making a store
const store = createStore(reducer);

// print the initial state
// console.log("initial state ", store.getState());
// setup the listener to the state if it changes will print the following

/* 4.1 =>  1 =>  add subscibe to the state
           2 =>  then making dispatch
           3 =>  then unsubscribe 
*/
const listener = () => console.log("upload state ", store.getState());
const unsub = store.subscribe(listener);
// making an action
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());

unsub();
// if u make action after this it is not gonna work
/*note that that you can pass an object to the dispatch method 
 but in every time u need to write an object so to have a function that return the the action will be better choise  
 */
