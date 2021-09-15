import React from 'react'
import { Drawer,Form,Input,DatePicker,Select,Button } from 'antd'


const {Item} = Form

const weekOptions = [
    {label:"Week 1",value:1},
    {label:"Week 2",value:2},
    {label:"Week 3",value:3},
    {label:"Week 4",value:4},
    {label:"Week 5",value:5},
    {label:"Week 6",value:6},
]

const Index = ({open,onClose=()=>{}})=>{


    return(
        <Drawer visible={open} 
            onClose={()=>onClose()}
            width={400}
            title="Submit Report">
            
            <Form layout="vertical">
                <Item name="classNo" label="Class No.">
                    <Select options={weekOptions}/>
                </Item>
                <Item name="students" label="Students">
                    <Select  mode="multiple" placeholder="Select students" options={weekOptions}/>
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Item>
            </Form>
        </Drawer>
    )
}

export default Index