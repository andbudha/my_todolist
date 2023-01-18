import React, {ChangeEvent} from 'react';
import {TaskFilterType} from "../../App";
import './Todolist.css'
import {Input} from "../Input/Input";


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

    return (
        <div>
            <div>
                <h3>{props.title}</h3>

                    <Input getInputValue={getInputValue}/>

                {props.tasks.map(taskID=>{

                    const taskRemoveOnClickHandler = () => {
                        props.removeTask(props.todolistID,taskID.id)
                    }

                    //on click check box func
                    const taskStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID,event.currentTarget.checked, taskID.id)
                    }
                    return(
                        <ul key={taskID.id}>
                            <li className={taskID.isDone ? 'is-done' : ''}>
                                <button onClick={taskRemoveOnClickHandler}>x</button>
                                <span>{taskID.title}</span>
                                <input
                                    type="checkbox"
                                    checked={taskID.isDone}
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

