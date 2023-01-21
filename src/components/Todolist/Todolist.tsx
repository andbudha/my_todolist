import React, {ChangeEvent} from 'react';
import {TaskFilterType} from "../../App";
import './Todolist.css'
import {Input} from "../Input/Input";
import {TitleChanger} from "../Titlechanger/TitleChanger";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType ={
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistID: string,taskID: string)=> void
    filterTasks:(todolistID: string, filterButtonName: TaskFilterType)=> void
    addTask:(todolistID: string, inputValue: string)=> void
    changeTaskStatus:(todolistID: string,isDone: boolean, taskID: string)=> void
    filter: TaskFilterType
    removeList:(todolistID: string)=> void
    updateTaskTitle:(todolistID: string,taskID: string, newTitle: string)=> void
    updateListTitle:(todolistID: string, newTitle: string)=> void
}
export const Todolist = (props: TodolistPropsType) => {



    //task filtering func.-s
    const onAllClickTaskFilteringHandler = () => {
        props.filterTasks(props.todolistID,'all');
    }

    const onActiveClickTaskFilteringHandler = () => {
        props.filterTasks(props.todolistID,'active');
    }

    const onCompletedClickTaskFilteringHandler = () => {
        props.filterTasks(props.todolistID,'completed');
    }

    //task adding intermediate func
    const getInputValue = (inputValue: string) => {
        props.addTask(props.todolistID,inputValue);
    }

    //list removing func
    const removeListHandler = () => {
      props.removeList(props.todolistID)
    }
    
    //list title intermediate updating func
    const updateListTitleHandler = (newTitle: string) => {
        props.updateListTitle(props.todolistID, newTitle);
    }
    return (
        <div>
            <div>
                <h3>
                    <TitleChanger title={props.title} callBack={updateListTitleHandler}/>
                    {/*<button onClick={removeListHandler}>X</button>*/}
                    <IconButton aria-label="delete" onClick={removeListHandler}>
                        <DeleteIcon />
                    </IconButton>
                </h3>
                    <Input getInputValue={getInputValue}/>

                {props.tasks.map(task=>{

                    const taskRemoveOnClickHandler = () => {
                        props.removeTask(props.todolistID,task.id)
                    }

                    //on click check box func
                    const taskStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID,event.currentTarget.checked, task.id)
                    }
                    //task title intermediate updating func
                    const updateTaskTitleHandler = (newTitle: string) => {
                        props.updateTaskTitle(props.todolistID, task.id, newTitle);
                    }
                    return(
                        <ul key={task.id}>
                            <li className={task.isDone ? 'is-done' : ''}>

                                {/*<button onClick={taskRemoveOnClickHandler}>x</button>*/}
                                <IconButton aria-label="delete" onClick={taskRemoveOnClickHandler}>
                                    <DeleteIcon />
                                </IconButton>

                                <TitleChanger title={task.title} callBack={updateTaskTitleHandler}/>
                                
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={taskStatusChangeHandler}
                                />
                            </li>

                        </ul>
                    );
                })}
                <div>
                    <button
                        onClick={onAllClickTaskFilteringHandler}
                        className={props.filter === 'all' ? 'active-filter' : ''}
                    >All</button>
                    <button
                        onClick={onActiveClickTaskFilteringHandler}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                    >Active</button>
                    <button
                        onClick={onCompletedClickTaskFilteringHandler}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                    >Completed</button>
                </div>
            </div>
        </div>
    );
};

