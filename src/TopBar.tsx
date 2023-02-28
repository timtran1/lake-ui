import React from 'react'
import baseProps from './types/basePropType'

import './css/TopBar.css'

interface TopBarProps extends baseProps {
    hoverEffect?: boolean
}
export default function (props: TopBarProps) {
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