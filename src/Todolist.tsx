import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (inputValue: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todoListId: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    // let [inputValue, setInputValue] = useState('');
    // let [error, setError] = useState<string | null>(null);
    //
    // const addTaskHandler = () => {
    //     if (inputValue.trim() !== '') {
    //         props.addTask(inputValue.trim(), props.id);
    //         setInputValue('');
    //     } else {
    //         setError('title is required');
    //     }
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.key === 'Enter') {
    //         addTaskHandler()
    //     }
    // }

    const removeTaskHandler = (tid: string) => {
        props.removeTask(tid, props.id)
    }

    //const tsarChangeFilter = (value: FilterValuesType) => {
    //props.changeFilter(value);
    //}

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };

    const addTask = (inputValue: string) => {
        props.addTask(inputValue, props.id);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*<button onClick={removeTodolist}>x</button>*/}
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(t => {
                            const removeTaskHandler = () => {
                                props.removeTask(t.id, props.id)
                            }

                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeStatus(t.id, e.currentTarget.checked, props.id);
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id)
                            }
                            return (
                                <li key={t.id} className={t.isDone ? 'is-Done' : ''}>
                                    {/*<input type="checkbox"*/}
                                    {/*       onChange={onChangeHandler}*/}
                                    {/*       checked={t.isDone}*/}
                                    {/*/>*/}
                                    <Checkbox onChange={onChangeHandler}
                                              checked={t.isDone}
                                    />
                                    <EditableSpan title={t.title}
                                                  onChange={onChangeTitleHandler}/>
                                    {/*<button onClick={removeTaskHandler}>x</button>*/}
                                    <IconButton onClick={removeTaskHandler}>
                                        <Delete/>
                                    </IconButton>
                                    {/*<Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>*/}
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'}
                    // className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button color={'primary'}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                    // className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button color={'secondary'}
                        variant={props.filter === 'completed' ? 'contained' : 'text'}
                    // className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}

