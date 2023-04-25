import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import baseProps from "./types/basePropType";

import './css/Checkbox.css';

export interface CheckboxProps extends baseProps {
    checked?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    icon?: React.ReactNode
    label?: string
}

export default function (props: CheckboxProps) {
    const {
        className,
        style,
        checked,
        onChange,
        icon,
        label,
        ...other
    } = props

    return (
        <div className={`lake-checkbox-wrap`}>
            <div className={`lake-checkbox-input-wrap ${className || ''}`} style={style}>
                <div className={`lake-checkbox-checked`}>
                    {icon ? icon : <FontAwesomeIcon icon={faCheck} className={`lake-checkbox-icon`}/>}
                </div>
                <div className={`lake-checkbox-bg`}></div>
            </div>
            <input
                type="checkbox"
                className={`lake-checkbox-input`}
                checked={checked}
                onChange={onChange}
                {...other}
            />
            {label && <div className={`lake-checkbox-label`}>{label}</div>}
        </div>
    )
}