export const signUp = data => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        dispatch({type: 'AUTH_START'})
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
        } catch(err){
            console.log('Somwthing wrong happened: ', err.message);
        }
        dispatch({type: 'AUTH_END'})
    }
} 