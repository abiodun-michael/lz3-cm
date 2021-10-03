import React from "react";
import {Drawer,Form,Input,Select,Button,Space, message} from 'antd'
import { INVITE_ADMIN } from '../../graphql/Admins'
import { useMutation } from "@apollo/client";
import {useWidth} from '../../hooks'


const Index = ({onClose=()=>{}, open})=>{
    const {Item} = Form
    const width = useWidth()

const [inviteAdmin,{loading}] = useMutation(INVITE_ADMIN,{
    onCompleted({inviteAdmin}){
        if(inviteAdmin.status){
            message.success(inviteAdmin.message)
            onClose()
        }else{
            message.error(inviteAdmin.message)
        }
    }
})

const handleFinish = (input)=>{
    const {name,email,phone,role} = input
    inviteAdmin({variables:{name,email,phone,permission:{role,service:"cm"}}})
}

    return(
        <>
            <Drawer width={width > 768 ? 450 : width-20} visible={open} title="Add Manager" onClose={()=>onClose()}>
                <Form layout="vertical" 
                    requiredMark={false} onFinish={(e)=>handleFinish(e)}>
                    <Item label="Name*" name="name" 
                        rules={[{message:"Name is required", required:true}]}>
                        <Input placeholder="e.g. John"/>
                    </Item>
                    <Item label="Email*" name="email"
                         rules={[{message:"Email is required", required:true}]}>
                        <Input type="email" placeholder="e.g mail@mail.com"/>
                    </Item>
                    <Item label="Phone*" name="phone"
                         rules={[{message:"Phone is required", required:true}]}>
                        <Input type="tel" placeholder="e.g 08181842799"/>
                    </Item>
                    <Item label="Role*" name="role"
                         rules={[{message:"Role is required", required:true}]}>
                        <Select 
                            options={[{label:"Admin",value:"ADMIN"},{label:"Editor",value:"EDITOR"}]}
                            placeholder="Choose an option"/>
                    </Item>
                    <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=>onClose()}>Cancel</Button>
                        <Button htmlType="submit" loading={loading} type="primary">Save</Button>
                    </Space> 
                    </Item>
                </Form>
            </Drawer>
        </>
    )
}

export default Index