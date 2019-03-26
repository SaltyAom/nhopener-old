import { createStore } from "redux"
import reducers from "./reducers"

const initState: any = {
}, store = createStore(reducers, initState);

export default store;