import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListsType = {
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

    const addTask = (inputValue: string) => {
        let newTask = {id: v1(), title: inputValue, isDone: false};
        setTasks([newTask, ...tasks])
    }

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(task => task.id !== id);
        tasksObj[todoListId] = filteredTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);
    }


    //let tasksForTodolist = tasks
    //if (filter === 'active') {
    //tasksForTodolist = tasks.filter(task => task.isDone === false)
    //}
    //if (filter === 'completed') {
    //tasksForTodolist = tasks.filter(task => task.isDone === true)
    //}

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todoList = todoLists.find(tl => tl.id === todolistId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: v1(), title: "What to learn", filter: "active"},
        {id: v1(), title: "What to buy", filter: "completed"}
    ])

    let [tasksObj, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true}
        ]
    })

    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
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
                    />
                })
            }


        </div>
    );
}

export default App;
