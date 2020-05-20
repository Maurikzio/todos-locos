import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from '../Firebase/firebase'
import { reactReduxFirebase, getFirebase} from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import rootReducer from './reducers/rootReducer'; 

// const rrfConfig = {
//     userProfile: 'users',
//     useFirestoreForProfile: true 
//   }

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        // reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase), // SOLUTION TO ERROR--> Firebase instance does not yet exist
        // applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))) 
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})))
        // applyMiddleware(thunk))
) ;

export default store; 