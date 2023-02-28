import {useEffect, useRef} from "react";

export default function (value: any) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}