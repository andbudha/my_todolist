import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    //task-state

    const[tasks, setTasks]=useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ])

    //task removing function
    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task=>task.id !== taskID));
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn.'}
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
