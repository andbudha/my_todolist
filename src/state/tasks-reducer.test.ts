import {v1} from "uuid";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test('The correct task must be deleted', ()=>{

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

    const taskToBeRemoved = startState[todolistID2][0].id;

    const resultState = tasksReducer(startState, removeTaskAC(todolistID2, taskToBeRemoved))

    expect(resultState[todolistID2].length).toBe(2);
    expect(resultState[todolistID2][0].title).toBe("JS-2")

});


test('A new task must be added to the first list', ()=>{

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

    const newTask = 'Unit-Test';

    const resultState = tasksReducer(startState, addNewTaskAC(todolistID1, newTask));

    expect(resultState[todolistID1].length).toBe(4);
    expect(resultState[todolistID1][0].title).toBe(newTask);
    expect(resultState[todolistID2].length).toBe(3);

});


test('The targeted task must change its status', ()=>{

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

    const taskID = startState[todolistID1][2].id;
    const taskStatus = startState[todolistID1][2].isDone;

    const resultState = tasksReducer(startState, changeTaskStatusAC(todolistID1, taskID, taskStatus));

    expect(resultState[todolistID1][2].isDone).toBe(true);
    expect(resultState[todolistID1][2].title).toBe("ReactJS");
    expect(resultState[todolistID2][2].isDone).toBe(false);


});

test('The targeted task-title must be changed', ()=>{

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

    const newTitle = 'Node-JS';
    const taskID = startState[todolistID2][2].id;


    const resultState = tasksReducer(startState, changeTaskTitleAC(todolistID2, taskID, newTitle));

    expect(resultState[todolistID2][2].title).toBe(newTitle);
    expect(resultState[todolistID1][2].title).toBe("ReactJS");

});
