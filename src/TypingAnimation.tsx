import React, {useRef} from 'react'
import useIsInViewport from "./utilities/useIsInViewport";
import baseProps from "./types/basePropType";
import './css/TypingAnimation.css'

export interface TypingAnimationProps extends baseProps {
    cursorColor?: string
    textColor?: string
    stepDuration?: number
    // only allow text node children
    children: string
}

export default function TypingAnimation(props: TypingAnimationProps) {
    const {
        cursorColor = 'black',
        textColor = 'black',
        stepDuration = 0.05,


        children,
        className = '',
        ...other
    } = props

    const ref: React.MutableRefObject<any> = useRef(null)
    const isInViewport: boolean = useIsInViewport(ref)

    return (
        <span ref={ref} className={`lake-typing ${isInViewport ? 'animate' : ''} ${className}`}
              style={{
                  '--n': children.length, // number of characters
                  '--cursor-color': cursorColor,
                  '--text-color': textColor,
                  '--step-duration': `${stepDuration}s`,
              } as React.CSSProperties}
              {...other}
        >
            {children}
        </span>
    )
}