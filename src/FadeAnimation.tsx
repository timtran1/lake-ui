import React, {useRef} from 'react'
import useIsInViewport from "./utilities/useIsInViewport";
import baseProps from "./types/basePropType";

import './css/FadeAnimation.css'

export interface FadeAnimationProps extends baseProps {
    opacityStart?: number
    duration?: number
    delay?: number
    opacityEnd?: number

}

export default function FadeAnimation(props: FadeAnimationProps) {
    const {
        duration = 0.5,
        delay = 0,
        opacityStart = 0,
        children,
        className = '',
        opacityEnd = 1,
        ...other
    } = props


    const ref: React.MutableRefObject<any> = useRef(null)
    const isInViewport: boolean = useIsInViewport(ref)

    let fadeClassStart: string = 'lake-fade-start'
    let fadeClassEnd: string = 'lake-fade-end'


    return (
        <div ref={ref} className={`lake-fade ${isInViewport ? fadeClassEnd : fadeClassStart} ${className}`}
             style={{
                 '--duration': `${duration}s`,
                 '--delay': `${delay}s`,
                 '--opacity-start': opacityStart,
                 '--opacity-end': opacityEnd,
             } as React.CSSProperties}
             {...other}
        >
            {children}
        </div>
    )
}