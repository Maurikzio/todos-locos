import * as actions from '../actions/actionTypes'

const initialState = { 
    error: null, 
    loading: false,
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
                loading: false
            }
        }
        default:
            return state;
    }
}
export default authReducer;

