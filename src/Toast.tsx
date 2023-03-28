import React from 'react'
import baseProps from './types/basePropType'
import {useEffect, useState} from "react";
import Button from "./Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import './css/Toast.css'

export interface ToastProps extends baseProps {
    timeOut?: number
    left?: boolean
    bottom?: boolean
    disableAutoClose?: boolean
    disableCloseBtn?: boolean
    useOpen: [boolean, (open: boolean) => void]
}

export default function (props: ToastProps) {
    const {timeOut, left, bottom, disableAutoClose, disableCloseBtn, useOpen, children, className, ...other} = props
    const [open, setOpen] = useOpen
    const [opacity, setOpacity] = useState(open ? 'show' : 'hide')
    const [timeOutId, setTimeOutId] = useState(0)

    useEffect(() => {
        if (open) setOpacity('show')
        if (open && !disableAutoClose) setTimeOutId(setTimeout(() => setOpen(false), timeOut || 3000))
        if (!open) setTimeout(() => setOpacity('hide'), 100)

        return () => clearTimeout(timeOutId)
    }, [open, disableAutoClose])

    return (
        <div
            className={`lake-toast ${opacity} ${left ? 'left' : ''} ${bottom ? 'bottom' : ''} ${open ? 'open' : ''} ${className}`}
            {...other}
        >
            <div className={`lake-toast-content`}>
                {children}
            </div>

            {!disableCloseBtn && <Button
                onClick={() => setOpen(false)}
                hoverEffect={false}
                style={{
                    background: 'transparent',
                    borderRadius: `50%`,
                    padding: '0.5em',
                }}
            >
                <FontAwesomeIcon icon={faXmark}/>
            </Button>}
        </div>
    )
}