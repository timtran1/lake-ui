import React, {useState, useEffect, useRef} from 'react'
import usePrevious from "./utilities/usePrevious";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import baseProps from "./types/basePropType";

import './css/Slider.css'

export interface SliderProps extends baseProps {
    autoPlay?: boolean
    delay?: number
    disableButtons?: boolean
    insetControls?: boolean
    pauseOnHover?: boolean
    renderNext?: (nextFunc: () => void) => React.ReactNode
    renderPrev?: (prevFunc: () => void) => React.ReactNode
}

export interface SliderPanelProps extends baseProps {
    index: number
    currentIndex: number
}


function SliderPanel(props: SliderPanelProps) {
    const {children, index, currentIndex} = props
    const ref = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(currentIndex === index ? '' : 'hold-right')
    const prevIndex = usePrevious(currentIndex) || 0;

    useEffect(() => {
        if (Math.abs(currentIndex - prevIndex) > 1) {
            handleReverse();
        } else {
            handleNormal();
        }
        
    }, [currentIndex])

    const handleReverse = () => {
        if (!ref.current) {
            return;
        }
        // right click (ex: index from 3 -> 0)
        if (prevIndex > currentIndex) {
            if (currentIndex === index) {
                // move to the right immediately, then move to center by replace with active class
                ref.current.classList.remove('hold-left', 'slide-left');
                ref.current.classList.add('hold-right');
                setTranslateX('active');
            } else {
                if (prevIndex === index) { // leaving away from this panel
                    setTranslateX('slide-left');
                } else { // return to holding position
                    if (index > currentIndex) {// hold on the right
                        setTranslateX('hold-right')
                    } else { // hold on the left
                        setTranslateX('hold-left')
                    }
                }
            }
        } else {
            if (currentIndex === index) {
                // move to the left immediately, then move to center by replace with active class
                ref.current.classList.remove('hold-right', 'slide-right');
                ref.current.classList.add('hold-left');
                setTranslateX('active');
            } else {
                if (prevIndex === index) { // leaving away from this panel
                    setTranslateX('slide-right');
                } else { // return to holding position
                    if (index > currentIndex) {// hold on the right
                        setTranslateX('hold-right')
                    } else { // hold on the left
                        setTranslateX('hold-left')
                    }
                }
            }
        }
    }

    const handleNormal = () => {
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
    }

    return (
        <div ref={ref} className={`lake-slider-panel ${translateX} ${index}`}>
            {children}
        </div>
    )
}

export default function (props: SliderProps) {
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
            className={`lake-slider ${className}`} {...other}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}>
            <div className={`${insetControls ? 'lake-slider-inset-controls-left' : ''}`}>
                {disableButtons ? null : renderPrev ? renderPrev(prev) : <button
                    aria-label={'Previous'}
                    className={`lake-slider-btn`}
                    onClick={prev}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </button>}
            </div>
            <div className={`lake-slider-content`}>
                {React.Children.map(children, (child, i) =>
                    <SliderPanel key={i} index={i} currentIndex={index}>
                        {child}
                    </SliderPanel>)
                }
            </div>
            <div className={`${insetControls ? 'lake-slider-inset-controls-right' : ''}`}>
                {disableButtons ? null : renderNext ? renderNext(next) : <button
                    aria-label={'Next'}
                    className={`lake-slider-btn`}
                    onClick={next}>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>}
            </div>
        </div>
    )
}