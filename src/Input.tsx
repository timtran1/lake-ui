import React from 'react'
import baseProps from './types/basePropType'

import './css/Input.css'

interface InputProps extends baseProps {
    focusEffect?: boolean
    value?: any
    onChange?: (e: any) => void
}

export default function (props: InputProps) {
    const {className, focusEffect, value, onChange, ...other} = props

    return (
        <input
            className={`lake-input ${focusEffect === false ? '' : 'focus-effect'}  ${className}`}
            value={value}
            onChange={onChange}
            {...other}
        />
    )
}