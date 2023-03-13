import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    let initTasks = [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ]

    let [tasks, setTasks] = useState(initTasks);

    const addTask = (inputValue: string) => {
        const newTask = {id: v1(), title: inputValue, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    function changeStatus(taskId: string) {
        let task = tasks.find(t => t.id === taskId)
    }


    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForTodolist = tasks
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;
