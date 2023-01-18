import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {Input} from "./components/Input/Input";


export type TaskFilterType = 'all' | 'active' | 'completed';

export type ToDoListType = {
    id: string
    title: string
    filter: TaskFilterType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let[toDoList, setToDoList]=useState<Array<ToDoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}

    ])

    console.log(toDoList)


    let [tasks, setTasks] = useState({
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todolistID2] : [
            {id: v1(), title: "HTML&CSS-2", isDone: true},
            {id: v1(), title: "JS-2", isDone: true},
            {id: v1(), title: "ReactJS-2", isDone: false}
        ]
    });

    //task removing func
    const removeTask = (todolistID: string,taskID: string) => {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].filter(task=>task.id !== taskID)]})
    }

    //task adding func
    const addTask = (todolistID: string, inputValue: string) => {
        const newTask: TaskType =  {id: v1(), title: inputValue, isDone: false}
        setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]})
    }

    //task filtering func
    const filterTasks = (todolistID: string, filterButtonName: TaskFilterType) => {
        setToDoList([...toDoList].map(list=>list.id===todolistID ? {...list, filter: filterButtonName} : list))
    }

    //checkbox ticking func
    const changeTaskStatus = (todolistID: string, isDone: boolean, taskID: string) => {
        setTasks({...tasks, [todolistID]:[...tasks[todolistID].map(task=>task.id === taskID ? {...task, isDone} : task)]})
    }

    //new-list adding function
    const addNewListHandler = (inputValue: string) => {
        const newID = v1();
        const newList: ToDoListType = {id: newID, title: inputValue, filter: 'all'}
        setToDoList([...toDoList, newList]);
        setTasks({...tasks,[newID]:[]})
    }
    
    //remove list func
    const removeList = (todolistID: string) => {
        setToDoList([...toDoList.filter(list=>list.id !== todolistID)]);

    }
    return (
        <div className="App">
            <Input getInputValue={addNewListHandler}/>
            {toDoList.map(list=>{
                //task filter conditioning
                let filteredTasks = tasks[list.id];

                if(list.filter === 'completed'){
                    filteredTasks = tasks[list.id].filter(task=>task.isDone)
                }

                if(list.filter === 'active'){
                    filteredTasks = tasks[list.id].filter(task=>!task.isDone)
                }
                return(
                    <Todolist
                        key={list.id}
                        todolistID={list.id}
                        title={list.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        filterTasks={filterTasks}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={list.filter}
                        removeList={removeList}
                    />
                );
            })}

        </div>
    );
}

export default App;
