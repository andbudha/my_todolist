import {v1} from "uuid";
import {tasksReducer} from "./tasks-reducer";
import {AddNewToDoListAC} from "./todolist_reducer";

test('A new array must be added along with the new todolist', ()=>{

    const todolistID1 = v1();

    const todolistID2 = v1();

    const startState = {
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    };


    const newListTitle = 'New To DO List';
    const action = AddNewToDoListAC(newListTitle);

    const resultState = tasksReducer(startState, action);

    const keys = Object.keys(resultState);

    const newKey = keys.find(key=> key !== todolistID1 && key !== todolistID2);


    expect(keys.length).toBe(3);
    expect(newKey).toBe(action.payload.todolistID)
});
