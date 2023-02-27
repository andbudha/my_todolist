import {ToDoListType} from "../AppPlusReducer";
import {v1} from "uuid";
import {TaskFilterType} from "../AppPlusReducer";


export type ActionType = RemoveToDoListACType
    | AddNewToDoListACType
    | ChangeToDoListTitleACType
    | ChangeToDoListFilterACType

const initialState: ToDoListType[] = [];

export const todolistReducer = (state: ToDoListType[] = initialState, action: ActionType): ToDoListType[] => {
    switch (action.type) {
        case "REMOVE-TO-DO-LIST": {
            return state.filter(list=>list.id !== action.payload.id);
        }
        case "ADD-NEW-TODOLIST": {
            return [...state, {id: action.payload.todolistID, title: action.payload.newListTitle, filter: 'all'}];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(list=>list.id === action.payload.listID ? {...list, title: action.payload.newListTitle} : list);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(list=>list.id === action.payload.listID ? {...list, filter: action.payload.newFilter} : list);
        }
        default: {
            return state;
        }
    }
}


export type RemoveToDoListACType = ReturnType<typeof RemoveToDoListAC>
export const RemoveToDoListAC = (listID: string) => {
    return{
        type: 'REMOVE-TO-DO-LIST',
        payload: {
            id: listID
        }
    }as const
}


export type AddNewToDoListACType = ReturnType<typeof AddNewToDoListAC>
export const AddNewToDoListAC = (newListTitle: string) => {
    return{
        type: 'ADD-NEW-TODOLIST',
        payload: {
            newListTitle: newListTitle,
            todolistID: v1()
        }
    }as const
}


type ChangeToDoListTitleACType = ReturnType<typeof ChangeToDoListTitleAC>
export const ChangeToDoListTitleAC = (newListTitle: string, listID: string) => {
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            newListTitle: newListTitle,
            listID: listID
        }
    }as const
}


type ChangeToDoListFilterACType = ReturnType<typeof ChangeToDoListFilterAC>
export const ChangeToDoListFilterAC = (listID: string, newFilter: TaskFilterType) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            newFilter: newFilter,
            listID: listID
        }
    }as const
}