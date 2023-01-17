import React, {ChangeEvent, KeyboardEvent,useState} from 'react';
import {TaskFilterType} from "../../App";
import './Todolist.css'


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

    //error state
    const[error, setError]=useState<string | null>(null)
    console.log(error)

    //input value catching func
    const inputValueCatchingHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    //task adding func
    const taskAddingHandler = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim());
            setInputValue('')
        } else {
            setError('Task is required!')
        }
    }

    //on enter-key adding func
    const onKeyDownAddTaskHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(event.key === 'Enter' && inputValue.trim() !== ''){
            props.addTask(event.currentTarget.value.trim());
            setInputValue('')
        } else {
            setError('Task is required!')
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
                        className={error ? 'error' : ''}
                        value={inputValue}
                        onChange={inputValueCatchingHandler}
                        onKeyDown={onKeyDownAddTaskHandler}
                    />
                    <button onClick={taskAddingHandler}>+</button>
                    {error && <div className='error-message'>{error}</div>}
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

