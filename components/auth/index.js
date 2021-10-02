import React from 'react'
import {Card, Form, Input,Button, message} from 'antd'
import style from './Index.module.scss'
import {useMutation} from '@apollo/client'
import {LOGIN} from '../../graphql/Admins'
import Router from 'next/router'

const Index = ()=>{

    const {Item} = Form


const [login, {loading}] = useMutation(LOGIN,{
    onCompleted({login}){
        if(login.status){
            message.success(login.message)
            localStorage.setItem("token",login.sessionId)
            Router.replace("/account/members")
        }else{
            message.error(login.message)
        }
    }
})



    return(
        <div className={style.wrapper}>
            <Card className={style.form_wrapper}>
                <div className={style.top_wrapper}>
            <img src="./images/logo.svg" className={style.logo}/>
            <h3 style={{color:"#7367f0", marginTop:10}}>Church Manager</h3>
            </div>
            <div className={style.forms}>
                <Form layout="vertical" onFinish={(e)=>login({variables:e})} 
                requiredMark={false}>
                    <Item label="Email" name="email" rules={[{required:true, message:"Email address required"}]}>
                        <Input type="email" placeholder="abiodun@michael.com"/>
                    </Item>
                    <Item label="Password" name="password" rules={[{required:true, message:"Password is required"}]}>
                        <Input type="password" placeholder="***********"/>
                    </Item>
                    <Item>
                        <Button htmlType="submit" loading={loading} style={{width:"100%"}} type="primary">Login</Button>
                    </Item>
                </Form>
            </div>
        </Card>
        </div>
        
    )
}

export default Index