import React from 'react';

type TaskType ={
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
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

                    return(
                        <ul>
                            <li key={list.id}>
                                <button>x</button>
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

