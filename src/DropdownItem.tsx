import React from "react";
import baseProps from "./types/basePropType";

import './css/DropdownItem.css'

export interface DropdownItemProps extends baseProps {
    hoverClass?: string
}

export default function (props: DropdownItemProps) {
    const {hoverClass, children, className, ...other} = props

    return (
        <div
            className={`lake-dropdown-item ${hoverClass ? hoverClass : 'hover'} ${className}`}
            {...other}
        >
            {children}
        </div>
    )
}