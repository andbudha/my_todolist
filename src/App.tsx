import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


export type TaskFilterType = 'all' | 'active' | 'completed';

function App() {

    //task-state
    const[tasks, setTasks]=useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ]);

    //task filtering state
    const[filter, setFilter]=useState<TaskFilterType>('all')

    //task removing func
    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task=>task.id !== taskID));
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
            />
        </div>
    );
}

export default App;
