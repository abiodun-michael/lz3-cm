import React from 'react'
import {Drawer, Form, Input, Divider, Select, DatePicker,Radio, Button,Space, Col, Row} from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import { addCell } from '../../redux/slices/drawer'


const Index = ()=>{
    const {Item} = Form

    const {addCell:addCellOpen} = useSelector(state=>state.drawer)
    const dispatch = useDispatch()
   

    return(
        <Drawer visible={addCellOpen} title="Add Cell" width={450} closeIcon={null}>

            <Form layout="vertical" requiredMark={false}>
           
                <Item label="Cell Name" name="cellName"
                    rules={[{message:"Cell name is required", required:true}]}>
                    <Input placeholder="Enter full name" size="large"/>
                </Item>
                <Item label="Cell Description" name="cellDescription"
                    rules={[{message:"Cell description is required", required:true}]}>
                    <Input.TextArea rows={5} placeholder="Describe the cell" size="large"/>
                </Item>

                <Item label="Cell Leader" name="cellLeader"
                    rules={[{message:"Cell description is required", required:true}]}>
                    <Select 
                        options={[{label:"Abiodun Michael", value:1}]}
                        placeholder="Choose a leader" 
                        size="large"/>
                </Item>
                  
                <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=>dispatch(addCell(false))}>Cancel</Button>
                        <Button htmlType="submit" type="primary">Save</Button>
                    </Space>
                </Item>
                
            </Form>

        </Drawer>
    )
}

export default Index