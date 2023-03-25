import React from 'react'
import baseProps from './types/basePropType'
import {useEffect, useState} from "react";

import './css/SideDrawer.css'

interface SideDrawerProps extends baseProps {
    useOpen: [boolean, (open: boolean) => void]
    right?: boolean
}

export default function (props: SideDrawerProps) {
    const {useOpen, right, children, className, ...other} = props
    const [open, setOpen] = useOpen
    const [visibility, setVisibility] = useState(open ? 'open' : '')

    useEffect(() => {
        if (open) setVisibility('open')
        else setTimeout(() => setVisibility(''), 150)
    }, [open])

    return (
        <div className={`lake-sidebar-wrap ${visibility}`}>
            <div className={`lake-sidebar-bg `} onClick={() => setOpen(false)}/>

            <aside
                className={`lake-sidebar-content ${right? 'right' : ''} ${open ? 'open' : ''} ${className}`}
                {...other}
            >
                {children}
            </aside>
        </div>
    )
}