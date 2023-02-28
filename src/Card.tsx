import React from 'react'
import baseProps from './types/basePropType'

import './css/Card.css'

interface CardProps extends baseProps {
    hoverEffect?: boolean
}

export default function (props: CardProps) {
    const {children, className, hoverEffect,...other} = props

    return (
        <div className={`lake-card ${hoverEffect === false ? '' : 'hover-effect'} ${className}`} {...other}>
            {children}
        </div>
    )
}