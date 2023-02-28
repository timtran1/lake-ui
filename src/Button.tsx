import React from 'react'
import baseProps from './types/basePropType'

import './css/Button.css'

interface ButtonProps extends baseProps {
    hoverEffect?: boolean
    onClick?: (e: any) => void
}

export default function (props: ButtonProps) {
    const {onClick, children, className, hoverEffect, ...other} = props

    return (
        <button
            onClick={onClick}
            className={`lake-btn ${hoverEffect === false ? '' : 'hover-effect'} ${className}`}
            {...other}
        >
            {children}
        </button>
    )
}