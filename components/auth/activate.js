import React,{useEffect} from 'react'
import {Card, Form, Input,Button, message, Spin} from 'antd'
import style from './Index.module.scss'
import {useMutation} from '@apollo/client'
import {CHANGE_PASSWORD, ACTIVATE_ACCOUNT} from '../../graphql/Admins'
import Router from 'next/router'



const Index = ({code,email})=>{

    const {Item} = Form


const [changePassword, {loading}] = useMutation(CHANGE_PASSWORD,{
    onCompleted({changePassword}){
        if(changePassword.status){
            message.success(changePassword.message)
            Router.replace("/")
        }else{
            message.error(changePassword.message)
        }
    }
})
const [activateAccount, {loading:activating, data}] = useMutation(ACTIVATE_ACCOUNT,{
    onCompleted({activateAccount}){
        if(activateAccount.status){
            message.success(activateAccount.message)
        }else{
            message.error(activateAccount.message)
        }
    }
})

useEffect(()=>{
    activateAccount({variables:{email,code}})
},[])

    return(
        <div className={style.wrapper}>
            <Card className={style.form_wrapper} style={{height:300}}>
                <div className={style.top_wrapper}>
            <img src="./images/logo.svg" className={style.logo}/>
            <h3 style={{color:"#7367f0", marginTop:10}}>Church Manager</h3>
            </div>
           
            {
               !activating && data?.activateAccount?.status ?
            <div className={style.forms}>
                <Form layout="vertical" onFinish={(e)=>changePassword({variables:{password:e.password,email}})} 
                requiredMark={false}>
                    <Item label="Set Password" name="password" rules={[{required:true, message:"Password is required"}]}>
                        <Input.Password visibilityToggle type="password" placeholder="***********"/>
                    </Item>
                    <Item>
                        <Button htmlType="submit" loading={loading} style={{width:"100%"}} type="primary">Set Password</Button>
                    </Item>
                </Form>
            </div>:
             <div style={{height:120, maringTop:20,display:"flex", alignItems:"center", flexDirection:"column", justifyContent:"center", color:"red"}}>
             {
                 activating ? <Spin />:null}
                 {!activating && !data?.activateAccount?.status ?
                 <>
                     <p>Invalid activation code</p>
                     <Button type="link">Go home</Button>
                 </>:null
             }
             
         </div>
            
}
        </Card>
        </div>
        
    )
}



export default Index