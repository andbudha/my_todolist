import React from 'react';
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
}
export const Todolist = (props: TodolistPropsType) => {



    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                {props.tasks.map(list=>{

                    const taskRemoveOnClickHandler = () => {
                      props.removeTask(list.id)
                    }

                    return(
                        <ul>
                            <li key={list.id}>
                                <button onClick={taskRemoveOnClickHandler}>x</button>
                                <span>{list.title}</span>
                                <input type="checkbox" checked={list.isDone}/>
                            </li>

                        </ul>
                    );
                })}
                <div>
                    <button onClick={()=>props.filterTasks('all')}>All</button>
                    <button onClick={()=>props.filterTasks('active')}>Active</button>
                    <button onClick={()=>props.filterTasks('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

