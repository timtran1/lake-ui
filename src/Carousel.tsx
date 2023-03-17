import React, {useState, useEffect} from 'react'
import usePrevious from "./utilities/usePrevious";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import baseProps from "./types/basePropType";

import './css/Carousel.css'

export interface CarouselProps extends baseProps {
    autoPlay?: boolean
    delay?: number
    disableButtons?: boolean
    insetControls?: boolean
    pauseOnHover?: boolean
    renderNext?: (nextFunc: () => void) => React.ReactNode
    renderPrev?: (prevFunc: () => void) => React.ReactNode
}

export interface CarouselPanelProps extends baseProps {
    index: number
    currentIndex: number
}


function CarouselPanel(props: CarouselPanelProps) {
    const {children, index, currentIndex} = props
    const [translateX, setTranslateX] = useState(currentIndex === index ? '' : 'hold-right')
    const prevIndex = usePrevious(currentIndex)

    useEffect(() => {
        if (currentIndex === index) { // this is now active panel
            setTranslateX('active')
        } else { // this is not active panel
            if (prevIndex === index) { // leaving away from this panel
                if (index < currentIndex) { // move to forward panel, slide left
                    setTranslateX('slide-left')
                } else if (index > currentIndex) { // move to backward panel, slide right
                    setTranslateX('slide-right')
                }
            } else { // return to holding position
                if (index > currentIndex) {// hold on the right
                    setTranslateX('hold-right')
                } else { // hold on the left
                    setTranslateX('hold-left')
                }

            }
        }
    }, [currentIndex])

    return (
        <div className={`lake-carousel-panel ${translateX} ${index}`}>
            {children}
        </div>
    )
}

export default function (props: CarouselProps) {
    const {
        autoPlay,
        delay,
        children,
        className,
        renderNext,
        renderPrev,
        disableButtons,
        insetControls,
        pauseOnHover,
        ...other
    } = props
    const [index, setIndex] = useState(0)
    const [pause, setPause] = useState(false)

    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(() => {
                if (!pause) next()
            }, delay || 3000)
            return () => clearInterval(interval)
        }
    }, [index, pause])

    function next() {
        if (index < React.Children.count(children) - 1) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    }

    function prev() {
        if (index > 0) {
            setIndex(index - 1)
        } else {
            setIndex(React.Children.count(children) - 1)
        }
    }

    function onMouseEnter() {
        if (pauseOnHover !== false) setPause(true)
    }

    function onMouseLeave() {
        if (pauseOnHover !== false) setPause(false)
    }

    return (
        <div
            className={`lake-carousel ${className}`} {...other}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <div className={`${insetControls ? 'lake-carousel-inset-controls-left' : ''}`}>
                {disableButtons ? null : renderPrev ? renderPrev(prev) : <button
                    className={`lake-carousel-btn`}
                    onClick={prev}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>}
            </div>
            <div className={`lake-carousel-content`}>
                {React.Children.map(children, (child, i) =>
                    <CarouselPanel key={i} index={i} currentIndex={index}>
                        {child}
                    </CarouselPanel>)
                }
            </div>
            <div className={`${insetControls ? 'lake-carousel-inset-controls-right' : ''}`}>
                {disableButtons ? null : renderNext ? renderNext(next) : <button
                    className={`lake-carousel-btn`}
                    onClick={next}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>}
            </div>
        </div>
    )
}