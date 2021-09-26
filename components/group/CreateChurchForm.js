import React from 'react'
import { Button, Drawer,Form,Input,message,Select } from 'antd'
import {CREATE_CHURCH,GET_ALL_GROUP_BY_ZONE_ID} from '../../graphql/Church'
import { useMutation } from '@apollo/client'


const {Item} = Form

const Index = ({open,close=()=>{},refetch,groupId})=>{

    const [createChurch,{loading}] = useMutation(CREATE_CHURCH,{
        onCompleted({createChurch}){
            if(createChurch.status){
                message.success(createChurch.message)
                refetch()
                close()
            }else{
                message.error(createChurch.message)
            }
        }
    })

    return(
        <Drawer width="500" title="Create Church" visible={open} onClose={()=>close()}>
            <Form layout="vertical" requiredMark={false} onFinish={(e)=>createChurch({variables:{...e,isGroup:false,groupId:parseInt(groupId),zoneId:1}})}>
                <Item label="Name*" name="name" rules={[{message:"Church name is required", required:true}]}>
                    <Input placeholder="Enter group name"/>
                </Item>
                <Item label="Address*" name="address" rules={[{message:"Church address is required", required:true}]}>
                    <Input placeholder="Enter church address"/>
                </Item>
                <Item label="Longitude" name="longitude">
                    <Input placeholder="Enter church longitude"/>
                </Item>
                <Item label="Latitude" name="latitude">
                    <Input placeholder="Enter church latitude"/>
                </Item>
                <Item label="Type*" name="type" rules={[{message:"Church type is required", required:true}]}>
                    <Select 
                        placeholder="Select a type"
                        options={[
                            {label:"Church", value:"CHURCH"},
                            {label:"Teens", value:"TEENS"},
                            {label:"Language", value:"LANGUAGE"},
                            {label:"Youth", value:"YOUTH"},
                            {label:"Children", value:"CHILDREN"}
                        ]}/>
                </Item>
                <Item>
                    <Button type="primary" loading={loading} htmlType="submit">Save</Button>
                </Item>
            </Form>
        </Drawer>
    )
}

export default Index