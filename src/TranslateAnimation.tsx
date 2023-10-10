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
    repeat?: boolean
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
        repeat = false,
        ...other
    } = props


    const ref: React.MutableRefObject<any> = useRef(null)
    let isInViewport: boolean = useIsInViewport(ref)
    const translateClass = useRef('');
    const [textTranslate, setTextTranslate] = useState(() => {
        switch (to) {
            case 'right':
                translateClass.current = 'lake-translate-start-right'
                break
            case 'top':
                translateClass.current = 'lake-translate-start-top'
                break
            case 'bottom':
                translateClass.current = 'lake-translate-start-bottom'
                break
            case 'left':
                translateClass.current = 'lake-translate-start-left'
                break
        }
        return translateClass.current;
    })

    useEffect(() => {
        if (isInViewport) {
            setTimeout(() => {
                setTextTranslate('');
            }, delay * 1000);
        } else {
            if (repeat) {
                setTextTranslate(translateClass.current);
            }
        }
    }, [isInViewport, delay]);

    return (
        <div 
            className={`${mask ? 'overflow-hidden' : ''} ${className}`}
            {...other}
        >
            <div ref={ref} className={`lake-translate ${textTranslate}`}
                style={{
                    '--duration': `${textTranslate ? 0 : duration}s`,
                    '--distance': distance,
                } as React.CSSProperties}
            >
                {children}
            </div>
        </div>
    )
}