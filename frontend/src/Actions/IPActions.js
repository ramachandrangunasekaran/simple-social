import axios from 'axios';


export function getMyIP() {
    return dispatch => {
        var instance = axios.create();
        var url = "https://api.ipify.org/?format=json"
        instance.get(url).then((data) => {
            if (data.status === 200) {
                dispatch({
                    type: "GET_IP_RESULT",
                    data
                })
            } 
        }).catch((error) => {
            dispatch({
                type: "ERROR",
                error
            })
        });
    }
}