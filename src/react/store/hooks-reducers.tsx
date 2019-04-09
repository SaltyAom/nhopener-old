interface initState {
    redirectURL: string|undefined,
    code: string,
    toggleMenu: boolean
}

export const initState:initState = {
    redirectURL: undefined,
    code: "007aff",
    toggleMenu: false
}

type Action = { 
    type: string, 
    newURL: string,
    code: string,
    toggleMenu: boolean
}

export const reducers = (state: initState, action: Action) => {
    switch(action.type){
        case "updateURL":
            return { ...state, redirectURL: action.newURL }
        case "updateCode":
            return { ...state, code: action.code }
        case "toggleMenu":
            return { ...state, toggleMenu: action.toggleMenu }
        default:
            return { ...state }
    }
}