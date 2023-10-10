import { configureStore } from "@reduxjs/toolkit"
import {Credentials} from "./reducers"
const store = configureStore({
    reducer:{
        Cred:Credentials
    }
});
export default store;