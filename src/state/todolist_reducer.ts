import {ToDoListType} from "../App";

export const todolistReducer = (state: ToDoListType[], action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(list=>list.id !== action.payload.listID);
        }
        default: {
            throw new Error('I do not grasp this type!');
        }
    }
}

type ActionType = RemoveToDoListACType

type RemoveToDoListACType = ReturnType<typeof RemoveToDoListAC>
export const RemoveToDoListAC = (listID: string) => {
    return{
        type: 'REMOVE-TODOLIST',
        payload: {
            listID
        }
    }as const
}