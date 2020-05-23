import * as actions from '../actions/actionTypes'

const initialState = { 
    error: null, 
    loading: false,
    verifyEmail: {
        error: null, 
        loading: false
    }
};

const authReducer = (state =  initialState, action) => {
    switch(action.type){
        case actions.AUTH_START:
            return {
                ...state, 
                loading: true
            }
        case actions.AUTH_END:
            return {
                ...state, 
                loading: false
            }
        case actions.AUTH_SUCCESS:
            return {
                ...state, 
                error: false
            }
        case actions.AUTH_FAIL:
            return {
                ...state, 
                error: action.payload
            }
        case actions.CLEAN_UP:{
            return {
                ...state, 
                error: null,
                loading: false,
                verifyEmail: {
                    ...state.verifyEmail,
                    loading: false,
                    error: null
                }
            }
        }
        case actions.VERIFY_START:
            return{
                ...state,
                verifyEmail: {
                    ...state.verifyEmail, 
                    loading: true
                }
            }
        case actions.VERIFY_SUCCESS: 
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    loading: false,
                    error: false
                }
            }
        case actions.VERIFY_FAIL: 
            return {
                ...state,
                verifyEmail: {
                    ...state.verifyEmail,
                    loading: false,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}
export default authReducer;

