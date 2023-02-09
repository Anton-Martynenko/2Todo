import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {v1} from "uuid";

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
    let [inputValue, setInputValue] = useState('')

    const addTaskHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if (e.key === 'Enter') {
           addTaskHandler()
       }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <button onClick={addTaskHandler}>+</button>
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
                    props.changeFilter('active')
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
