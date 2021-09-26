import React from 'react'
import { Button, Drawer,Form,Input,message,Select } from 'antd'
import {CREATE_CHURCH,GET_ALL_GROUP_BY_ZONE_ID} from '../../graphql/Church'
import { useMutation } from '@apollo/client'


const {Item} = Form

const Index = ({open,close=()=>{},refetch})=>{

    const [createChurch,{loading}] = useMutation(CREATE_CHURCH,{
        onCompleted({createChurch}){
            if(createChurch.status){
                message.success(createChurch.message)
                refetch()
                close()
            }else{
                message.error(createChurch.message)
            }
        },
        update(cache,{data}){
            const newEntry = data.createChurch?.church
            const existingEntry = cache.readQuery({query:GET_ALL_GROUP_BY_ZONE_ID, variables:{zoneId:1}})
            if(newEntry && existingEntry){
                cache.writeQuery(
                    {query:GET_ALL_GROUP_BY_ZONE_ID,
                    data:{
                        getAllGroupByZoneId:[...existingEntry,newEntry]
                    }
                    }
                )
            }
        }
    })

    return(
        <Drawer width="500" title="Create Group" visible={open} onClose={()=>close()}>
            <Form layout="vertical" requiredMark={false} onFinish={(e)=>createChurch({variables:{...e,isGroup:true,zoneId:1}})}>
                <Item label="Name*" name="name" rules={[{message:"Group name is required", required:true}]}>
                    <Input placeholder="Enter group name"/>
                </Item>
                <Item label="Address*" name="address" rules={[{message:"Group address is required", required:true}]}>
                    <Input placeholder="Enter group address"/>
                </Item>
                <Item label="Longitude" name="longitude">
                    <Input placeholder="Enter group longitude"/>
                </Item>
                <Item label="Latitude" name="latitude">
                    <Input placeholder="Enter group latitude"/>
                </Item>
                <Item label="Type*" name="type" rules={[{message:"Group type is required", required:true}]}>
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