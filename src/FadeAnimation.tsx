import React, {useRef} from 'react'
import useIsInViewport from "./utilities/useIsInViewport";
import baseProps from "./types/basePropType";

import './css/FadeAnimation.css'

export interface FadeAnimationProps extends baseProps {
    opacity?: number
    duration?: number
    delay?: number

}

export default function FadeAnimation(props: FadeAnimationProps) {
    const {
        duration = 0.5,
        delay = 0,
        opacity = 0,
        children,
        className = '',
        ...other
    } = props


    const ref: React.MutableRefObject<any> = useRef(null)
    const isInViewport: boolean = useIsInViewport(ref)

    let fadeClass: string = 'lake-fade-start'


    return (
        <div ref={ref} className={`lake-fade ${isInViewport ? '' : fadeClass} ${className}`}
             style={{
                 '--duration': `${duration}s`,
                 '--delay': `${delay}s`,
                 '--opacity': opacity,
             } as React.CSSProperties}
             {...other}
        >
            {children}
        </div>
    )
}