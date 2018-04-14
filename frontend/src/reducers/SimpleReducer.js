import initialState from './InitialState';


function parseIPResult(old_state, action) {
    var new_state = {}
    Object.assign(old_state, new_state); 
    new_state.ip_address = action.data.data.ip
    return new_state;
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'GET_IP_RESULT':
            return parseIPResult(state, action);
        default:
            return state
    }
}
