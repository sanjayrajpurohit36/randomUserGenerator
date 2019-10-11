import axios from "axios";


export function getAllUserAction(dispatch) {
    console.log("action")
    return axios.get("https://randomuser.me/api/")
        .then((response) => {
            dispatch(
                {
                    type: "USER_DATA",
                    payload: response.data
                }
            )
         })
    
}

export function addMemberAction(memberData) {
    console.log("memaction", memberData)
    return function (dispatch) {
        dispatch(
            {
                type: "ALL_USER",
                payload: memberData
            }
        )
    }
}

export function deleteMemberAction(key) {
    console.log("key",key)
    return function (dispatch) {
        dispatch(
            {
                type: "DELETE_MEMBER",
                payload: key
            }
        )
    }
}