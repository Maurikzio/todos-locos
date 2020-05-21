import * as actions from './actionTypes'

//singup action creator
export const signUp = data => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        dispatch({type: actions.AUTH_START})
        try{
            const res = await firebase
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password);
                console.log(res);

            await firestore
                .collection('users')
                .doc(res.user.uid)
                .set({
                    firstName: data.firstName,
                    lastName: data.lastName,
                })
            dispatch({ type: actions.AUTH_SUCCESS})    
        } catch(err){
            dispatch({ type: actions.AUTH_FAIL, payload: err.message })
            console.log('Somwthing wrong happened: ', err.message);
        }
        dispatch({type: actions.AUTH_END})
    }
};

//logout action creator
export const signOut = () => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try{
            await firebase.auth().signOut();
        }catch(err){
            console.log(err.message);
        }
    }
}