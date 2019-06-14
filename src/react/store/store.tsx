import { createStore } from 'redux'

/* Type Defination */
export interface initStoreType {
    redirectURL: string|undefined,
    code: string,
    toggleMenu: boolean,
    allow: boolean
    suggestStories: any
}

type Action = { 
    type: string,
    payload: {
        newURL: string,
        code: string,
        toggleMenu: boolean,
        allow: boolean,
        suggestStories: any
    }
}

export const initState:initStoreType = {
    redirectURL: undefined,
    code: "000000",
    toggleMenu: false,
    allow: false,
    suggestStories: []
}

export const reducers = (state: initStoreType, action: Action) => {
    switch(action.type){
        case "UpdateURL":
            return { 
                ...state,
                redirectURL: action.payload.newURL 
            }
        case "UpdateCode":
            return { 
                ...state, 
                code: action.payload.code 
            }
        case "ToggleMenu":
            return { 
                ...state, 
                toggleMenu: action.payload.toggleMenu 
            }
        case "NewSuggestStories":
            return { 
                ...state,
                payload: {
                    suggestStories: action.payload.suggestStories 
                }
            }
        case "SetAllowance":
            return { 
                ...state,
                payload: {
                    allow: action.payload.allow 
                }
            }
        default:
            return { 
                ...state 
            }
    }
}

export const store = createStore(reducers, initState);