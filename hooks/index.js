import React,{useState,useEffect} from 'react'

export const useWidth = ()=>{
    const [width, setWidth] = useState(0)

    useEffect(()=>{
        const innerWidth = window.innerWidth
        setWidth(innerWidth)
    },[])

    return width
}