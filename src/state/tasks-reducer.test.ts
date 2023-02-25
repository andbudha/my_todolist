import {v1} from "uuid";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteToDoListAC,
    removeTaskAC,
    tasksReducer, TaskStateType
} from "./tasks-reducer";

let todolistID1 = v1();

let todolistID2 = v1();

let startState: TaskStateType;

beforeEach(()=>{
    todolistID1 = v1();

    todolistID2 = v1();

    startState = {
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

})

test('The correct task must be deleted', ()=>{

    const taskToBeRemoved = startState[todolistID2][0].id;

    const resultState = tasksReducer(startState, removeTaskAC(todolistID2, taskToBeRemoved))

    expect(resultState[todolistID2].length).toBe(2);
    expect(resultState[todolistID2][0].title).toBe("JS-2")

});


test('A new task must be added to the first list', ()=>{

    const newTask = 'Unit-Test';

    const resultState = tasksReducer(startState, addNewTaskAC(todolistID1, newTask));

    expect(resultState[todolistID1].length).toBe(4);
    expect(resultState[todolistID1][0].title).toBe(newTask);
    expect(resultState[todolistID2].length).toBe(3);

});


test('The targeted task must change its status', ()=>{

    const taskID = startState[todolistID1][2].id;
    const taskStatus = startState[todolistID1][2].isDone;

    const resultState = tasksReducer(startState, changeTaskStatusAC(todolistID1, taskID, taskStatus));

    expect(resultState[todolistID1][2].isDone).toBe(true);
    expect(resultState[todolistID1][2].title).toBe("ReactJS");
    expect(resultState[todolistID2][2].isDone).toBe(false);


});

test('The targeted task-title must be changed', ()=>{

    const newTitle = 'Node-JS';
    const taskID = startState[todolistID2][2].id;


    const resultState = tasksReducer(startState, changeTaskTitleAC(todolistID2, taskID, newTitle));

    expect(resultState[todolistID2][2].title).toBe(newTitle);
    expect(resultState[todolistID1][2].title).toBe("ReactJS");

});


test('The targeted todolist and its tasks must be deleted', ()=>{

    const resultState = tasksReducer(startState, deleteToDoListAC(todolistID2));

    const keys = Object.keys(resultState);


    expect(keys.length).toBe(1);
    expect(resultState[todolistID2]).toBeUndefined();
});

