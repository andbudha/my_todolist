import {TaskType} from "../components/Todolist/Todolist";

type TaskStateType = {
    [key: string]: TaskType[]
}


type TasksActionType = removeTaskACType
export const tasksReducer = (state: TaskStateType, action: TasksActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.payload.listID]
                    :[...state[action.payload.listID].filter(task=>task.id !== action.payload.taskID)]};
        default:
            return  state;
    }
}





type removeTaskACType = ReturnType<typeof removeTaskAC>

export const removeTaskAC = (listID: string, taskID: string) => {
    return{
        type: 'REMOVE-TASK',
        payload: {
            listID, taskID
        }
    }as const
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