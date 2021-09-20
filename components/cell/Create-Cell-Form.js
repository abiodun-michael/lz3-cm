import React from 'react'
import {Drawer, Form, Input, Divider, Select, DatePicker,Radio, Button,Space, Col, Row} from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import { addCell } from '../../redux/slices/drawer'
import { CREATE_CELL } from '../../graphql/Cell'
import { GET_ALL_MEMBER } from '../../graphql/Member'
import { useMutation, useQuery } from '@apollo/client'



const Index = ()=>{
    const {Item} = Form

    const {addCell:addCellOpen} = useSelector(state=>state.drawer)
    const dispatch = useDispatch()

    const [createCell,{loading:creating}] = useMutation(CREATE_CELL)
    const {data,loading} = useQuery(GET_ALL_MEMBER)
    const memberOption = data?.getAllMember?.map(({firstName,lastName,id})=>({label:firstName+' '+lastName, value:id}))

    return(
        <Drawer visible={addCellOpen} title="Add Cell" width={450} closeIcon={null}>

            <Form layout="vertical" requiredMark={false} onFinish={(e)=>createCell({variables:e})}>
           
                <Item label="Cell Name" name="name"
                    rules={[{message:"Cell name is required", required:true}]}>
                    <Input placeholder="Enter full name" size="large"/>
                </Item>
                <Item label="Cell Description" name="desc"
                    rules={[{message:"Cell description is required", required:true}]}>
                    <Input.TextArea rows={5} placeholder="Describe the cell" size="large"/>
                </Item>

                <Item label="Cell Leader" name="leaderId"
                    rules={[{message:"Cell description is required", required:true}]}>
                    <Select loading={loading}
                        options={memberOption}
                        placeholder="Choose a leader" 
                        size="large"/>
                </Item>
                  
                <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=>dispatch(addCell(false))}>Cancel</Button>
                        <Button htmlType="submit" loading={creating} type="primary">Save</Button>
                    </Space>
                </Item>
                
            </Form>

        </Drawer>
    )
}

export default Index