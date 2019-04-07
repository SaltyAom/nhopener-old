import { createStore } from "redux"
import reducers from "./redux-reducers"

const initState: any = {
}, store = createStore(reducers, initState);

export default store;