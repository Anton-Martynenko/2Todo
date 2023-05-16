import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddAlarm} from "@mui/icons-material";
//import {Button} from "./components/Button/Button";

export type AddItemFormPropsType = {
    addItem: (inputValue: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    let [inputValue, setInputValue] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim());
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

    return (
        <div>
            {/*<input value={inputValue}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyPressHandler}*/}
            {/*       className={error ? 'error' : ''}/>*/}
            <TextField value={inputValue}
                       variant={'outlined'}
                       label={'Type value'}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
                       // className={error ? 'error' : ''}
            />
            {/*<Button name={'+'} callBack={addTaskHandler}/>*/}
            <IconButton onClick={addTaskHandler} color={'primary'}>
                <AddAlarm />
            </IconButton>
            {/*{error && <div className={'error-message'}>Title is required</div>}*/}
        </div>
    )
}