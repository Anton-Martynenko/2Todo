import React, {useState} from 'react';
import {FilterValuesType} from "./App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (inputValue: string) => void
}

export function Todolist(props: PropsType) {
    let[inputValue,setInputValue] = useState('')
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={(e) => setInputValue(e.currentTarget.value)}/>
                <button onClick={ () => {props.addTask(inputValue)} } >+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {

                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={() => {
                                props.removeTask(task.id)
                            }}>
                                x
                            </button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>
                    All
                </button>
                <button onClick={() => {
                    props.changeFilter( 'active')
                }}>
                    Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>
                    Completed
                </button>
            </div>
        </div>
    )
}
