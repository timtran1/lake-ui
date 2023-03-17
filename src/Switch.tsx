import React from "react";
import baseProps from "./types/basePropType";

import './css/Switch.css';

export interface SwitchProps extends baseProps {
    renderEnabled?: React.ReactNode
    renderDisabled?: React.ReactNode
    renderButton?: React.ReactNode
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    checked?: boolean
    size?: 'small' | 'medium' | 'large'
}

export default function (props: SwitchProps) {
    const {
        className,
        renderEnabled,
        renderDisabled,
        renderButton,
        onChange,
        checked,
        size,
        ...other
    } = props
    const sizeClass = size || 'medium'

    return (
        <div className={`lake-switch-wrap ${sizeClass} ${className}`} {...other}>
            <input type="checkbox" className={`lake-switch-input ${sizeClass}`} checked={checked} onChange={onChange}/>
            <div className={`lake-switch-button ${sizeClass}`}>{renderButton}</div>
            <div className={`lake-switch-bg`}></div>
            <div className={`lake-switch-text-off`}>{renderDisabled}</div>
            <div className={`lake-switch-text-on`}>{renderEnabled}</div>
        </div>
    );
}