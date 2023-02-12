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
        default: {
            throw new Error('I do not grasp this type!');
        }
    }
}

type ActionType = RemoveToDoListACType | AddNewToDoListACType

type RemoveToDoListACType = ReturnType<typeof RemoveToDoListAC>
export const RemoveToDoListAC = (listID: string) => {
    return{
        type: 'REMOVE-TODOLIST',
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