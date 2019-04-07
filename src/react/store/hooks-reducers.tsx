interface initState {
    redirectURL: string|undefined
}

export const initState:initState = {
    redirectURL: undefined
}

type Action = { type: string, newURL: string }

export const reducers = (state: initState, action: Action) => {
    switch(action.type){
        case "updateURL":
            return { ...state, redirectURL: action.newURL }
        default:
            return { ...state }
    }
}