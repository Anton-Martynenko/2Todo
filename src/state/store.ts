import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-Reducer";
import {tasksReducer} from "./tasks-Reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;