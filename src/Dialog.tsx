import React, {useEffect, useState} from "react";
import baseProps from "./types/basePropType";

import './css/Dialog.css'

export interface DialogProps extends baseProps {
    useOpen: [boolean, (open: boolean) => void]
}

export default function (props: DialogProps) {
    const {className, children, useOpen, ...others} = props
    const [open, setOpen] = useOpen
    const [display, setDisplay] = useState(open ? 'show' : 'hide')

    useEffect(() => {
        if (open) setDisplay('flex')
        else setTimeout(() => setDisplay('hidden'), 150)
    }, [open])

    return (
        <div className={`lake-dialog-wrap ${open ? 'open' : ''} ${display}`}>
            <div className="lake-dialog-bg"/>

            <div className="lake-dialog-content-wrap">
                <div className="lake-dialog-content-flex-container" onClick={() => setOpen(false)}>
                    <div
                        className={`lake-dialog-content ${open ? 'open' : ''} ${className}`}
                        onClick={e => e.stopPropagation()}
                        {...others}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}