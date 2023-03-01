import React from 'react'
import baseProps from './types/basePropType'
import usePrevious from "./utilities/usePrevious"
import {useEffect, useState} from "react";

import './css/Tabs.css'

interface TabsProps extends baseProps {
    tabs: string[]
    tabless?: boolean
    useCurrentTabIndex: [number, (index: number) => void]
}

interface TabProps {
    index: number
    tab: string
    useCurrentTabIndex: [number, (index: number) => void]
}

function Tab(props: TabProps) {
    const {index, tab} = props
    const [currentTabIndex, setCurrentTabIndex] = props.useCurrentTabIndex
    const [translateX, setTranslateX] = useState(currentTabIndex === index ? '' : 'translate-right')
    const prevTabIndex = usePrevious(currentTabIndex)

    useEffect(() => {
        if (currentTabIndex === index) { // this is now active panel
            setTranslateX('')
        }
        if (prevTabIndex === index) { // leaving away from this panel
            if (index < currentTabIndex) { // move to forward panels
                setTranslateX('translate-right')
            } else if (index > currentTabIndex) { // move to backward panels
                setTranslateX('translate-left')
            }
        }
    }, [currentTabIndex])

    return (
        <div className={`lake-tab ${currentTabIndex === index ? 'active': ''}`} onClick={() => setCurrentTabIndex(index)}>
            <div className={`lake-tab-bg ${translateX}`}></div>
            <div className={`lake-tab-content`}>{tab}</div>
        </div>
    )
}


export default function Tabs(props: TabsProps) {
    const {tabs, tabless, children, className, useCurrentTabIndex, ...other} = props

    return (
        <div className="lake-tabs-wrap">
            {!tabless &&
                <div className={`lake-tabs-bg ${className}`}>
                    {tabs.map((tab, index) =>
                        <Tab
                            key={index}
                            index={index}
                            tab={tab}
                            useCurrentTabIndex={useCurrentTabIndex}
                        />
                    )}
                </div>
            }

            <div className="lake-tabs-children">
                {children}
            </div>
        </div>
    )
}