const initialState = {
    authenticated: false
};
interface actiontype {
    type:string,
    payload: {}
}
const reducer = (state = initialState, action:actiontype) => {
    switch(action.type){
        case 'AUTHENTICATED':
            return {...state, authenticated: true};
        case 'UNAUTHENTICATED':
            return {...state, authenticated: false};
        default:
            return state;
    }
};
export default reducer;