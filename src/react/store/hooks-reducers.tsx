export interface initStoreType {
    redirectURL: string|undefined,
    code: string,
    toggleMenu: boolean,
    allow: boolean
    suggestStories: any
}

export const initState:initStoreType = {
    redirectURL: undefined,
    code: "007aff",
    toggleMenu: false,
    allow: false,
    suggestStories: []
}

type Action = { 
    type: string, 
    newURL: string,
    code: string,
    toggleMenu: boolean,
    allow: boolean,
    suggestStories: any
}

export const reducers = (state: initStoreType, action: Action) => {
    switch(action.type){
        case "updateURL":
            return { ...state, redirectURL: action.newURL }
        case "updateCode":
            return { ...state, code: action.code }
        case "toggleMenu":
            return { ...state, toggleMenu: action.toggleMenu }
        case "newSuggestStories":
            return { ...state, suggestStories: action.suggestStories }
        case "setAllowance":
            return { ...state, allow: action.allow }
        default:
            return { ...state }
    }
}