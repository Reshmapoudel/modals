// import { applyMiddleware, createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import thunk from 'redux-thunk'
// import reducers from './reducers'

// let store
// if (typeof window === 'undefined') {
//   store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
// } else {
//   if (!window['__NEXT_REDUX_STORE__']) {
//     store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
//     window['__NEXT_REDUX_STORE__'] = store
//   } else {
//     store = window['__NEXT_REDUX_STORE__']
//   }
// }

// export type RootState = ReturnType<typeof reducers>
// export default store
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {},
});
