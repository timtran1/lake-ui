import React from 'react'
import baseProps from './types/basePropType'

import './css/TopBar.css'

export default function (props: baseProps) {
    const {children, className, ...other} = props

    return (
        <header
            className={`lake-top-bar ${className}`}
            {...other}
        >
            {children}
        </header>
    )
}