import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {v1} from "uuid";
import {Button} from "./components/Button/Button";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (inputValue: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    id: string
}

export function Todolist(props: PropsType) {
    let [inputValue, setInputValue] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim());
            setInputValue('');
        } else {
            setError('title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const removeTaskHandler = (tid: string) => {
        props.removeTask(tid)
    }

    //const tsarChangeFilter = (value: FilterValuesType) => {
        //props.changeFilter(value);
    //}

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? 'error' : ''}/>
                <Button name={'+'} callBack={addTaskHandler}/>
                {error && <div className={'error-message'}>Title is required</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked);
                            }
                            return (
                                <li key={t.id} className={t.isDone ? 'is-Done' : ''}>
                                    <input type="checkbox"
                                           onChange={onChangeHandler}
                                           checked={t.isDone}
                                    />
                                    <span>{t.title}</span>
                                    <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button className={props.filter == 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
