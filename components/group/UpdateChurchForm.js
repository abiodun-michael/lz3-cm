import React,{useEffect} from 'react'
import { Button, Drawer,Form,Input,message,Select,Spin } from 'antd'
import {UPDATE_CHURCH, GET_CHURCH_BY_ID} from '../../graphql/Church'
import { useMutation,useLazyQuery } from '@apollo/client'


const {Item} = Form

const Index = ({open,close=()=>{},refetch,id})=>{

    const [form] = Form.useForm()

    const [updateChurch,{loading}] = useMutation(UPDATE_CHURCH,{
        onCompleted({updateChurch}){
            if(updateChurch.status){
                message.success(updateChurch.message)
                refetch()
                close()
            }else{
                message.error(updateChurch.message)
            }
        }
    })

    const [getChurchById,{loading:getting}] = useLazyQuery(GET_CHURCH_BY_ID,{
        onCompleted({getChurchById}){
            if(getChurchById){
                form.setFieldsValue(getChurchById)
            }
        }
    })

    useEffect(()=>{
        if(id){
            getChurchById({variables:{id:parseInt(id)}})
        }
    },[id])

    return(
        <Drawer width="500" title="Update Church" visible={open} onClose={()=>close()}>
            {getting ?
            <div style={{height:200, display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Spin />
            </div>:
            <Form layout="vertical" form={form} requiredMark={false} onFinish={(e)=>updateChurch({variables:{...e}})}>
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
                <Item name="id" hidden></Item>
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
            </Form>}
        </Drawer>
    )
}

export default Index