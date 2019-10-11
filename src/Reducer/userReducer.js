export default function reducer(state = {
    userData : {},
    allUser : [],
    deleteUser : []
}, action){
    switch(action.type){
        case "USER_DATA" : {
            return { ...state, userData : action.payload} 
        }
        case "ALL_USER" : {
           return {...state, allUser : [action.payload[0],...state.allUser]}
        }
        case "DELETE_MEMBER" : {
            return( {
                ...state,
                allUser : [
                    ...state.allUser.slice(0, action.payload),
                    ...state.allUser.slice(action.payload + 1)
                ],
            })
        }
        default : {}
    }

    return state;
}