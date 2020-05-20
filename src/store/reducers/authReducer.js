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
        default:
            return state;
    }
}
export default authReducer;

