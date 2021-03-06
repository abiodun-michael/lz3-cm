import React,{useState, useEffect} from 'react'
import {Drawer, Form, Input, Divider, Select, DatePicker,Radio, Button,Space, Col, Row, message} from 'antd'
import { CREATE_CELL } from '../../graphql/Cell'
import { GET_ALL_MEMBER } from '../../graphql/Member'
import { useMutation, useQuery } from '@apollo/client'



const Index = ({open,close=()=>{}, refetch=()=>{}})=>{
    const {Item} = Form

    const [width, setWidth] = useState(0)

    useEffect(()=>{
        const innerWidth = window.innerWidth
        setWidth(innerWidth)

        
    },[])


    const [createCell,{loading:creating}] = useMutation(CREATE_CELL,{
        onCompleted({createCell}){
            if(createCell.status){
                message.success(createCell.message)
                refetch()
            }else{
                message.error(createCell.message)
            }
        }
    })
    const {data,loading} = useQuery(GET_ALL_MEMBER)
    const memberOption = data?.getAllMember?.map(({firstName,lastName,id})=>({label:firstName+' '+lastName, value:id}))

    return(
        <Drawer visible={open} title="Add Cell" onClose={()=>close()} width={width > 768 ? 500: width - 20}>

            <Form layout="vertical" requiredMark={false} onFinish={(e)=>createCell({variables:e})}>

                <Item label="Cell Name*" name="name"
                    rules={[{message:"Cell name is required", required:true}]}>
                    <Input placeholder="Enter full name" size="large"/>
                </Item>
                <Item label="Cell Description*" name="desc"
                    rules={[{message:"Cell description is required", required:true}]}>
                    <Input.TextArea rows={5} placeholder="Describe the cell" size="large"/>
                </Item>
                   
                <Item label="Cell Leader*" name="leaderId">
                    <Select loading={loading}
                        options={memberOption}
                        placeholder="Choose a leader" 
                        size="large"/>
                </Item>
                  
                <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=>close()}>Cancel</Button>
                        <Button htmlType="submit" loading={creating} type="primary">Save</Button>
                    </Space>
                </Item>
                
            </Form>

        </Drawer>
    )
}

export default Index