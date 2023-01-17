import React, {ChangeEvent, KeyboardEvent,useState} from 'react';
import {TaskFilterType} from "./App";


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
}
export const Todolist = (props: TodolistPropsType) => {

    //input value state
    const[inputValue, setInputValue]=useState('');


    //input value catching func
    const inputValueCatchingHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    //task adding func
    const taskAddingHandler = () => {
        props.addTask(inputValue);
        setInputValue('')
    }

    //on enter-key adding func
    const onKeyDownAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            props.addTask(event.currentTarget.value);
            setInputValue('')
        }
    }

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


    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={inputValue}
                        onChange={inputValueCatchingHandler}
                        onKeyDown={onKeyDownAddTaskHandler}
                    />
                    <button onClick={taskAddingHandler}>+</button>
                </div>
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
                            <li>
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
                    <button onClick={onAllClickTaskFilteringHandler}>All</button>
                    <button onClick={onActiveClickTaskFilteringHandler}>Active</button>
                    <button onClick={onCompletedClickTaskFilteringHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};

