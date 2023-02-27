import {TaskType} from "../components/Todolist/Todolist";
import {v1} from "uuid";
import {AddNewToDoListACType} from "./todolist_reducer";


export type TaskStateType = {
    [key: string]: TaskType[]
}


type TasksActionType = removeTaskACType
    | addNewTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddNewToDoListACType
    | deleteToDoListACType

const initialState: TaskStateType = {};
export const tasksReducer = (state: TaskStateType = initialState, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.payload.listID]
                    :state[action.payload.listID]
                    .filter(task=>task.id !== action.payload.taskID)};
        case "ADD-NEW-TASK":
            const newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: true}
            return {...state, [action.payload.listID]:[newTask,...state[action.payload.listID]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.payload.todolistID]
                    :state[action.payload.todolistID]
                    .map(task=>task.id === action.payload.taskID ?
                        {...task, isDone: action.payload.taskStatus} : task)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.payload.listID]
                    :state[action.payload.listID]
                    .map(task=>task.id === action.payload.taskID ?
                        {...task, title: action.payload.newTitle} : task)}
        case "ADD-NEW-TODOLIST":
            return {...state, [action.payload.todolistID]:[]}
        case "REMOVE-TO-DO-LIST":
            const stateCopy = {...state}
            const {[action.payload.id]:[], ...rest} = stateCopy;
            return rest;
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



type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string, taskStatus: boolean) => {
    return{
        type: 'CHANGE-TASK-STATUS',
        payload:{
            todolistID, taskID, taskStatus
        }
    }as const
}


type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (listID: string, taskID: string, newTitle: string) => {
    return{
        type: 'CHANGE-TASK-TITLE',
        payload: {
            listID, taskID, newTitle
        }
    }as const
}


type deleteToDoListACType = ReturnType<typeof deleteToDoListAC>

export const deleteToDoListAC = (listID: string) => {
    return{
        type: 'REMOVE-TO-DO-LIST',
        payload: {
            id: listID
        }
    }as const
}