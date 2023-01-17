import React from 'react';

type TaskType ={
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: number)=> void
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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

