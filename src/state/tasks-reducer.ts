import {TaskType} from "../components/Todolist/Todolist";
import {v1} from "uuid";

type TaskStateType = {
    [key: string]: TaskType[]
}


type TasksActionType = removeTaskACType | addNewTaskACType
export const tasksReducer = (state: TaskStateType, action: TasksActionType) => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.payload.listID]
                    :state[action.payload.listID]
                    .filter(task=>task.id !== action.payload.taskID)};
        case "ADD-NEW-TASK":
            const newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: true}
            return {...state, [action.payload.listID]:[newTask,...state[action.payload.listID]]}
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


type addNewTaskACType = ReturnType<typeof addNewTaskAC>

export const addNewTaskAC = (listID: string, newTaskTitle: string) => {
    return{
        type: 'ADD-NEW-TASK',
        payload:{
            listID, newTaskTitle
        }
    }as const
}