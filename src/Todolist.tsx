import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {v1} from "uuid";
import {Button} from "./components/Button/Button";

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

    const removeTaskHandler = (tid: string) => {
        props.removeTask(tid)
    }

    const tsarChangeFilter = (value: FilterValuesType) => {
        props.changeFilter(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
                <Button name={'+'} callBack={addTaskHandler}/>
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const onChangeHandler = () => {
                                console.log(t.id + 'want to change!');
                            }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox"
                                           onChange={onChangeHandler}
                                           checked={t.isDone}/>
                                    <span>{t.title}</span>
                                    <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <Button name={'All'} callBack={() => tsarChangeFilter('all')}/>
                <Button name={'Active'} callBack={() => tsarChangeFilter('active')}/>
                <Button name={'Completed'} callBack={() => tsarChangeFilter('completed')}/>
            </div>
        </div>
    )
}
