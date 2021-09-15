import React from 'react'
import {Drawer, Form, Input, Divider, Select, DatePicker,Radio, Button,Space, Col, Row} from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import { addFdtsReport } from '../../redux/slices/drawer'

const classNumber = [
    {label:"Class 1", value:1},
    {label:"Class 2", value:2},
    {label:"Class 3", value:3},
    {label:"Class 4", value:4},
    {label:"Class 5", value:5},
    {label:"Class 6", value:6}
]

const Index = ()=>{
    const {Item} = Form

    const {addFdtsReport:addFdtsReportOpen} = useSelector(state=>state.drawer)
    const dispatch = useDispatch()
   

    return(
        <Drawer visible={addFdtsReportOpen} title="Submit FDTS Report" width={600} closeIcon={null}>

            <Form layout="vertical">
                <Item label="Class Number" name="class"
                    rules={[{message:"Class is required", required:true}]}>
                    <Select 
                        options={classNumber}
                        placeholder="Choose a leader" 
                        size="large"/>
                </Item>
                <Item label="Students" name="student"
                    rules={[{message:"Student is required", required:true}]}>
                    <Select 
                        mode="multiple"
                        options={[{label:"Abiodun Michael", value:1},
                        {label:"Belema Orupabo", value:2},
                        {label:"Abiodun Michael 2", value:3},
                        {label:"Abiodun John 2", value:4},
                        {label:"Abiodun John 1", value:5}
                    ]}
                        placeholder="Students in Class" 
                        size="large"/>
                </Item>
                <Item label="Principal Comment" name="note"
                    rules={[{message:"Note is required", required:true}]}>
                    <Input.TextArea rows={5} placeholder="Write a comment" size="large"/>
                </Item>

                <Item label="Date" name="date"
                    rules={[{message:"Date is required", required:true}]}>
                    <DatePicker placeholder="12-12-2021" size="large"/>
                </Item>
                  
                <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=>dispatch(addFdtsReport(false))}>Cancel</Button>
                        <Button htmlType="submit" type="primary">Submit Report</Button>
                    </Space>
                </Item>
                
            </Form>

        </Drawer>
    )
}

export default Index