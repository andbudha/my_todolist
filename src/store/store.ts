import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "../state/todolist_reducer";
import {tasksReducer} from "../state/tasks-reducer";


const rootReducer = combineReducers({

    todolists: todolistReducer,
    tasks: tasksReducer
});

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;


//@ts-ignore
window.store = store;