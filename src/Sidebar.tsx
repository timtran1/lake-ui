import React from 'react'
import baseProps from './types/basePropType'
import {useEffect, useState} from "react";

import './css/Sidebar.css'

interface SidebarProps extends baseProps {
    useOpen: [boolean, (open: boolean) => void]
}

export default function (props: SidebarProps) {
    const {useOpen, children, className, ...other} = props
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
                className={`lake-sidebar-content ${open ? 'open' : ''} ${className}`}
                {...other}
            >
                {children}
            </aside>
        </div>
    )
}