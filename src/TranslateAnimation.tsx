import React, {useEffect, useRef, useState} from 'react'
import useIsInViewport from "./utilities/useIsInViewport";
import baseProps from "./types/basePropType";

import './css/TranslateAnimation.css'

export interface TranslateAnimationProps extends baseProps {
    to?: 'right' | 'top' | 'bottom' | 'left'
    duration?: number
    distance?: string
    mask?: boolean
    delay?: number
}

export default function TranslateAnimation(props: TranslateAnimationProps) {
    const {
        to = 'right',
        duration = 0.5,
        distance = '100%',
        children,
        className = '',
        mask = false,
        delay = 0,
        ...other
    } = props


    const ref: React.MutableRefObject<any> = useRef(null)
    const isInViewport: boolean = useIsInViewport(ref)
    const [textTranslate, setTextTranslate] = useState('')

    let translateClass: string= ''
    switch (to) {
        case 'right':
            translateClass = 'lake-translate-start-right'
            break
        case 'top':
            translateClass = 'lake-translate-start-top'
            break
        case 'bottom':
            translateClass = 'lake-translate-start-bottom'
            break
        case 'left':
            translateClass = 'lake-translate-start-left'
            break
    }

    useEffect(() => {
        if (isInViewport) {
            setTimeout(() => {
                setTextTranslate('');
            }, delay * 1000);
        } else {
            setTextTranslate(translateClass);
        }
    }, [isInViewport, delay]);

    return (
        <div 
            className={`${mask ? 'overflow-hidden' : ''} ${className}`}
            {...other}
        >
            <div ref={ref} className={`lake-translate ${textTranslate}`}
                style={{
                    '--duration': `${duration}s`,
                    '--distance': distance,
                } as React.CSSProperties}
            >
                {children}
            </div>
        </div>
    )
}