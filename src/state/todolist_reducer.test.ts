
import { v1 } from 'uuid'
import {TaskFilterType, ToDoListType} from "../App";
import {
    AddNewToDoListAC,
    ChangeToDoListFilterAC,
    ChangeToDoListTitleAC,
    RemoveToDoListAC,
    todolistReducer
} from "./todolist_reducer";


let todolistID1 = v1();
let todolistID2 = v1();


let startState: ToDoListType[];
beforeEach(()=>{
    todolistID1 = v1();
    todolistID2 = v1();


    startState =([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]);
});



test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, RemoveToDoListAC(todolistID1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
});


test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    const endState = todolistReducer(startState, AddNewToDoListAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = 'New Todolist';
    const endState = todolistReducer(startState, ChangeToDoListTitleAC(newTodolistTitle, todolistID2));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: TaskFilterType = 'completed';
    const endState = todolistReducer(startState, ChangeToDoListFilterAC(newFilter, todolistID2));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
