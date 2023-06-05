export const authen = () =>{
    return {
        type: 'AUTHENTICATED'
    };
};
export const unauthen = () => {
    return {
        type: 'UNAUTHENTICATED'
    };
};