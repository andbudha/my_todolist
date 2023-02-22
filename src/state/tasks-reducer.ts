import {TaskType} from "../components/Todolist/Todolist";

type TaskStateType = {
    [key: string]: TaskType[]
}

export const tasksReducer = (state: TaskStateType, action: any) => {
    switch (action.type) {
        case 'XXX':
            return state;
        default:
            return  state;
    }
}





{/*


import {TaskType} from "../components/Todolist/Todolist";

export type TaskStateType = {
    [key: string]: TaskType[]
}

export type ActionsType = {
    type: string
}
export const tasksReducer = (state: TaskStateType, action: ActionsType):TaskStateType => {
    switch (action.type) {
        case 'XXX':
            return state;
        default:
            return state;
    }
}


*/}