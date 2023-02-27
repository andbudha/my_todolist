import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {Input} from "./components/Input/Input";
import ButtonAppBar from "./components/AppBar/ButtonAppBar";
import Container from '@mui/material/Container';
import {Grid} from "@mui/material";
import Paper from '@mui/material/Paper';
import {
    AddNewToDoListAC,
    ChangeToDoListFilterAC, ChangeToDoListTitleAC, RemoveToDoListAC,
} from "./state/todolist_reducer";
import {
    addNewTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskStateType
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


export type TaskFilterType = 'all' | 'active' | 'completed';

export type ToDoListType = {
    id: string
    title: string
    filter: TaskFilterType
}

function AppPlusRedux() {

    const toDoLists = useSelector<AppRootStateType, ToDoListType[]>(state => state.todolists);

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks);

    const dispatch = useDispatch();


    //task removing func
    const removeTask = (todolistID: string,taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    }

    //task adding func
    const addTask = (todolistID: string, inputValue: string) => {
        dispatch(addNewTaskAC(todolistID, inputValue));
    }

    //task filtering func
    const filterTasks = (todolistID: string, filterButtonName: TaskFilterType) => {
        dispatch(ChangeToDoListFilterAC(todolistID, filterButtonName));
    }

    //checkbox ticking func
    const changeTaskStatus = (todolistID: string, isDone: boolean, taskID: string) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, isDone));
        console.log(todolistID);
    }

    //new-list adding function
    const addNewListHandler = (inputValue: string) => {
        dispatch(AddNewToDoListAC(inputValue));
    }

    //remove list func
    const removeList = (todolistID: string) => {
        dispatch(RemoveToDoListAC(todolistID));
    }

    //task title updating func
    const updateTaskTitle = (todolistID: string,taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTitle));
    }

    //list title updating func
    const updateListTitle = (todolistID: string, newTitle: string) => {
        dispatch(ChangeToDoListTitleAC(newTitle, todolistID))
    }

    return(
        <div className="App">
            <ButtonAppBar/>
            <Container maxWidth="md">
                <Input getInputValue={addNewListHandler}/>
                <Grid container spacing={3} sx={{marginTop: '5px'}}>
                    {toDoLists.map(list=>{
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

export default AppPlusRedux;
