import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../../App";

type PropsType = {
    name?: string
    onClick?: () => void
    className?: any
    callBack: () => void

}

export const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button onClick={onClickHandler}>{props.name}</button>
    )
}