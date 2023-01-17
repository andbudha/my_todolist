import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type TaskFilterType = 'all' | 'active' | 'completed';

function App() {

    //task-state
    const[tasks, setTasks]=useState( [
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false }
    ]);

    //task filtering state
    const[filter, setFilter]=useState<TaskFilterType>('all')

    //task removing func
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task=>task.id !== taskID));
    }

    const addTask = (inputValue: string) => {
        const newTask = { id: v1(), title: inputValue, isDone: false }
        setTasks([newTask,...tasks]);

    }

    //task filter conditioning
    let filteredTasks = tasks;

    if(filter === 'completed'){
        filteredTasks = tasks.filter(task=>task.isDone)
    }

    if(filter === 'active'){
        filteredTasks = tasks.filter(task=>!task.isDone)
    }

    //task filtering func
    const filterTasks = (buttonName: TaskFilterType) => {
        setFilter(buttonName);
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn.'}
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
