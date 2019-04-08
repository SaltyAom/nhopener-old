interface initState {
    redirectURL: string|undefined,
    code: string
}

export const initState:initState = {
    redirectURL: undefined,
    code: "007aff"
}

type Action = { 
    type: string, 
    newURL: string,
    code: string
}

export const reducers = (state: initState, action: Action) => {
    switch(action.type){
        case "updateURL":
            return { ...state, redirectURL: action.newURL }
        case "updateCode":
            return { ...state, code: action.code }
        default:
            return { ...state }
    }
}