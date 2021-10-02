import React from 'react'



const Logo = ({height=100,paddingLeft=100,paddingTop=20,styles,...rest})=>{
    return(
        <>
        <div style={{height,paddingLeft, paddingTop,...styles}}>
            <img src="/images/logo.svg" {...rest}/>
        </div>
         </>
    )
}

export default Logo