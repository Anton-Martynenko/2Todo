import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";
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
            <input value={inputValue}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? 'error' : ''}/>
            {/*<Button name={'+'} callBack={addTaskHandler}/>*/}
            <Button onClick={addTaskHandler} variant={'contained'} color={'primary'}>+</Button>
            {error && <div className={'error-message'}>Title is required</div>}
        </div>
    )
}