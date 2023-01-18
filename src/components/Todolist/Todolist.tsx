import React, {ChangeEvent} from 'react';
import {TaskFilterType} from "../../App";
import './Todolist.css'
import {Input} from "../Input/Input";


type TaskType ={
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string)=> void
    filterTasks:(buttonName: TaskFilterType)=> void
    addTask:(inputValue: string)=> void
    changeTaskStatus:(isDone: boolean, taskID: string)=> void
    filter: TaskFilterType
}
export const Todolist = (props: TodolistPropsType) => {



    //task filtering func.-s
    const onAllClickTaskFilteringHandler = () => {
        props.filterTasks('all');
    }

    const onActiveClickTaskFilteringHandler = () => {
        props.filterTasks('active');
    }

    const onCompletedClickTaskFilteringHandler = () => {
        props.filterTasks('completed');
    }

    //task adding intermediate func
    const getInputValue = (inputValue: string) => {
        props.addTask(inputValue);
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>

                    <Input getInputValue={getInputValue}/>

                {props.tasks.map(list=>{

                    const taskRemoveOnClickHandler = () => {
                        props.removeTask(list.id)
                    }

                    //on click check box func
                    const taskStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(event.currentTarget.checked, list.id)
                    }
                    return(
                        <ul key={list.id}>
                            <li className={list.isDone ? 'is-done' : ''}>
                                <button onClick={taskRemoveOnClickHandler}>x</button>
                                <span>{list.title}</span>
                                <input
                                    type="checkbox"
                                    checked={list.isDone}
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

