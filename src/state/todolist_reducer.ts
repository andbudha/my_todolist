import {ToDoListType} from "../App";
import {v1} from "uuid";

export const todolistReducer = (state: ToDoListType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(list=>list.id !== action.payload.listID);
        }
        case "ADD-NEW-TODOLIST": {
            const newListID = v1();
            const newList =  {id: newListID, title: action.payload.newListTitle, filter: 'all'};
            return [...state, newList];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(list=>list.id === action.payload.listID ? {...list, title: action.payload.newListTitle} : list);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(list=>list.id === action.payload.listID ? {...list, filter: action.payload.newFilter} : list);
        }
        default: {
            throw new Error('I do not grasp this type!');
        }
    }
}

type ActionType = RemoveToDoListACType
    | AddNewToDoListACType
    | ChangeToDoListTitleACType
    | ChangeToDoListFilterACType


type RemoveToDoListACType = ReturnType<typeof RemoveToDoListAC>
export const RemoveToDoListAC = (listID: string) => {
    return{
        type: "REMOVE-TODOLIST",
        payload: {
            listID
        }
    }as const
}


type AddNewToDoListACType = ReturnType<typeof AddNewToDoListAC>
export const AddNewToDoListAC = (newListTitle: string) => {
    return{
        type: 'ADD-NEW-TODOLIST',
        payload: {
            newListTitle: newListTitle
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
export const ChangeToDoListFilterAC = (newFilter: string, listID: string) => {
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            newFilter: newFilter,
            listID: listID
        }
    }as const
}