import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {Input} from "./components/Input/Input";
import ButtonAppBar from "./components/AppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import {Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {
    AddNewToDoListAC,
    ChangeToDoListFilterAC, ChangeToDoListTitleAC, RemoveToDoListAC,
    todolistReducer
} from "./state/todolist_reducer";
import {addNewTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type TaskFilterType = 'all' | 'active' | 'completed';

export type ToDoListType = {
    id: string
    title: string
    filter: TaskFilterType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let[toDoList, dispatchToToDoList]=useReducer(todolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]);



    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2] : [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    });


    //task removing func
    const removeTask = (todolistID: string,taskID: string) => {
        dispatchToTasks(removeTaskAC(todolistID, taskID));
    }

    //task adding func
    const addTask = (todolistID: string, inputValue: string) => {
        dispatchToTasks(addNewTaskAC(todolistID, inputValue));
    }

    //task filtering func
    const filterTasks = (todolistID: string, filterButtonName: TaskFilterType) => {
        dispatchToToDoList(ChangeToDoListFilterAC(todolistID, filterButtonName));
    }

    //checkbox ticking func
    const changeTaskStatus = (todolistID: string, isDone: boolean, taskID: string) => {
        dispatchToTasks(changeTaskStatusAC(todolistID, taskID, isDone));
        console.log(todolistID);
    }

    //new-list adding function
    const addNewListHandler = (inputValue: string) => {
        const action = AddNewToDoListAC(inputValue);
        dispatchToToDoList(action);
        dispatchToTasks(action);
    }

    //remove list func
    const removeList = (todolistID: string) => {
        const action = RemoveToDoListAC(todolistID);
        dispatchToToDoList(action);
        dispatchToTasks(action);
    }

    //task title updating func
    const updateTaskTitle = (todolistID: string,taskID: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistID, taskID, newTitle));
    }

    //list title updating func
    const updateListTitle = (todolistID: string, newTitle: string) => {
        dispatchToToDoList(ChangeToDoListTitleAC(newTitle, todolistID))
    }

    return(
        <div className="App">
            <ButtonAppBar/>
            <Container maxWidth="md">
                <Input getInputValue={addNewListHandler}/>
                <Grid container spacing={3} sx={{marginTop: '5px'}}>
                    {toDoList.map(list=>{
                        //task filter conditioning
                        let filteredTasks = tasks[list.id];

                        if(list.filter === 'completed'){
                            filteredTasks = tasks[list.id].filter(task=>task.isDone)
                        }

                        if(list.filter === 'active'){
                            filteredTasks = tasks[list.id].filter(task=>!task.isDone)
                        }
                        return(
                            <Grid item>
                                <Paper elevation={5} sx={{padding: '10px'}}>
                                    <Todolist
                                        key={list.id}
                                        todolistID={list.id}
                                        title={list.title}
                                        tasks={filteredTasks}
                                        removeTask={removeTask}
                                        filterTasks={filterTasks}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={list.filter}
                                        removeList={removeList}
                                        updateTaskTitle={updateTaskTitle}
                                        updateListTitle={updateListTitle}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}

                </Grid>

            </Container>



        </div>
    );
}

export default App;
