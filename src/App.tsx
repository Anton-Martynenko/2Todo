import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    //let [tasks, setTasks] = useState([
        //{id: v1(), title: "HTML&CSS", isDone: true},
        //{id: v1(), title: "JS", isDone: true},
        //{id: v1(), title: "ReactJS", isDone: false},
        //{id: v1(), title: "Rest API", isDone: false},
        //{id: v1(), title: "GraphQL", isDone: false}
    //])

    //let [filter, setFilter] = useState<FilterValuesType>('all')

    const addTask = (inputValue: string, todolistId: string) => {
        let task = {id: v1(), title: inputValue, isDone: false};
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});
    }

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(task => task.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasksObj});
    }


    //let tasksForTodolist = tasks
    //if (filter === 'active') {
    //tasksForTodolist = tasks.filter(task => task.isDone === false)
    //}
    //if (filter === 'completed') {
    //tasksForTodolist = tasks.filter(task => task.isDone === true)
    //}

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"}
    ])

    let removeTodolist = (todolistId: string) => {
        let filterdTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filterdTodolist);
        delete tasksObj[todolistId];
        setTasks({...tasksObj});
    }

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true}
        ]
    });

    return (
        <div className="App">
            <input/><button>x</button>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }


        </div>
    );
}

export default App;
