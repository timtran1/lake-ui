import React, {useRef, useEffect, useState} from 'react'
import useIsInViewport from './utilities/useIsInViewport'
import baseProps from './types/basePropType'

import './css/TextSlide.css'

const defaultTransitionDuration = '300ms'
const defaultDelay = 300

export interface TextSlideProps extends baseProps {
    delay?: number
    duration?: string
    top?: boolean
    left?: boolean
    right?: boolean
}

export default function TextSlide(props: TextSlideProps) {
    const {children, delay, duration, top, left, right, className} = props;
    const ref = useRef<HTMLDivElement>(null);
    const isInViewport = useIsInViewport(ref);
    const [textTranslate, setTextTranslate] = useState<string>(
        top
            ? 'lake-text-slide-top'
            : left
                ? 'lake-text-slide-left'
                : right
                    ? 'lake-text-slide-right'
                    : 'lake-text-slide-bottom'
    );

    useEffect(() => {
        if (isInViewport) {
            setTimeout(() => {
                setTextTranslate('');
            }, delay || defaultDelay);
        }
    }, [isInViewport, delay]);

    const renderChild = (child: any, index: number) => {
        if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
            // text node
            return (
                <div className={`lake-text-slide-wrap`} key={index}>
                    <div
                        className={`${textTranslate} lake-text-slide-content`}
                        style={{transitionDuration: duration || defaultTransitionDuration}}
                    >
                        {child}
                    </div>
                </div>
            );
        }

        // react node
        if (typeof child === 'object') {
            return (
                <div className={`lake-text-slide-wrap`} key={index}>
                    {{
                        ...child,
                        props: {
                            className: `${child.props.className || ''} ${textTranslate} lake-text-slide-content`,
                            style: {
                                ...child.props.style || {},
                                transitionDuration: duration || defaultTransitionDuration,
                            },
                            key: index,
                        }
                    }}
                </div>
            );
        }

        // otherwise return null
        return null;
    };

    return (
        <div ref={ref} className={`border border-black lake-text-slide-wrap ${className || ''}`}>
            {Array.isArray(children) ? children.map(renderChild) : renderChild(children, 0)}
        </div>
    );
}