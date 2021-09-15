import React from 'react'
import {Drawer, Form, Input, Divider, Select, DatePicker,Radio, Button,Space, Col, Row, message} from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import { addMember } from '../../redux/slices/drawer'
import { CREATE_MEMBER } from '../../graphql/Member'
import { useMutation } from '@apollo/client'

const designationOptions = [
    {label:"Brother", value:"BROTHER"},
    {label:"Sister", value:"SISTER"},
    {label:"Pastor", value:"PASTOR"},
    {label:"Cell Leader", value:"CELL LEADER"},
    {label:"Cell Executive", value:"CELL EXECUTIVE"},
    {label:"Deacon", value:"DEACON"},
    {label:"Deaconness", value:"DEACONNESS"},
]
const cellOptions = [
    {label:"Unique", value:1},
    {label:"Blossom", value:2}
]

const CreateMemberForm = ()=>{
    const {Item} = Form

    const {addMember:addMemberOpen} = useSelector(state=>state.drawer)
    const dispatch = useDispatch()

    const [createMember, {loading:creating}] = useMutation(CREATE_MEMBER,{
        onCompleted({createMember}){
            if(createMember.status){
                message.success(createMember.message)
            }else{
                message.error(createMember.message)
            }
        }
    })
   

    return(
        <Drawer visible={addMemberOpen} title="Add Member" width={600} closeIcon={null}>

            <Form layout="vertical" 
                onFinish={(e)=>createMember({variables:e})}
                requiredMark={false}>
                <Item label="First Name" name="firstName"
                    rules={[{message:"First name is required", required:true}]}>
                    <Input placeholder="Enter first name" size="large"/>
                </Item>
                <Item label="Last Name" name="lastName"
                    rules={[{message:"Last name is required", required:true}]}>
                    <Input placeholder="Enter last name" size="large"/>
                </Item>
                <Row gutter={20}>
                    <Col md={8}>
                <Item label="Gender" name="gender"
                rules={[{message:"Gender is required", required:true}]}>
                   <Radio.Group optionType="button"
                    options={[{label:"Male", value:"MALE"}, {label:"Female", value:"FEMALE"}]}/>
                </Item>
                </Col>
                <Col md={16}>
                <Item label="Designation" name="designation"
                    rules={[{message:"Designation is required", required:true}]}>
                    <Select size="large" placeholder="Select designation"
                     options={designationOptions}/>
                </Item>
                </Col>
                </Row>
                <Item label="Marital Status" name="maritalStatus"
                rules={[{message:"Marital Status is required", required:true}]}>
                   <Radio.Group optionType="button"
                    options={[{label:"Single", value:"SINGLE"}, 
                    {label:"Married", value:"MARRIED"},
                    {label:"Divorced", value:"DIVORCED"},
                    {label:"Widowed", value:"WIDOWED"}
                    ]}/>
                </Item>
                <Item label="Employment Status" name="employmentStatus"
                rules={[{message:"Marital Status is required", required:true}]}>
                   <Radio.Group optionType="button"
                    options={[{label:"Employed", value:"EMPLOYED"}, 
                    {label:"Un-Employed", value:"UN_EMPLOYED"},
                    {label:"Self-Employed", value:"SELF_EMPLOYED"}
                    ]}/>
                </Item>

                <Item label="Date of Birth" name="dateOfBirth"
                rules={[{message:"Date of Birth is required", required:false}]}>
                    <DatePicker placeholder="Date of Birth"/>
                </Item>
                <Row gutter={20}>
                    <Col md={12}>
                        <Item label="Email Address" name="email"
                        rules={[{message:"Email is required"}]}>
                        <Input type="email" placeholder="Enter email address" size="large"/>
                    </Item></Col>
                  
                <Col md={12}>
                <Item label="Phone Number" name="phone"
                rules={[{message:"Phone number is required", required:true}]}>
                    <Input type="tel" placeholder="Enter phone number" size="large"/>
                </Item>
                </Col>
                </Row>
                <Item label="Home Address" name="homeAddress"
                 rules={[{message:"home Address is required",}]}>
                    <Input size="large" placeholder="Enter home address"/>
                </Item>
                <Item label="Office Address" name="officeAddress">
                    <Input size="large" placeholder="Enter office address"/>
                </Item>
               
                <Item label="Spoken Language" name="language">
                    <Input placeholder="Enter member language"/>
                </Item>

                <Item label="Foundation School" name="foundationSchoolStatus"
                rules={[{message:"Marital Status is required", required:true}]}>
                   <Radio.Group optionType="button"
                    options={[
                    {label:"Graduated", value:"GRADUATED"},
                    {label:"Ongoing", value:"ONGOING"},
                    {label:"Not Started", value:"NOT_STARTED"}
                    ]}/>
                </Item>
                <Item label="Baptized?" name="baptismStatus"
                rules={[{message:"Baptism Status is required", required:true}]}>
                   <Radio.Group optionType="button"
                    options={[{label:"Yes", value:true},
                    {label:"No", value:false}
                    ]}/>
                </Item>
                <Item label="Cell" name="cellId"
                    rules={[{message:"Cell is required"}]}>
                    <Select size="large" placeholder="Select cell"
                     options={cellOptions}/>
                </Item>
                  
                <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button onClick={()=>dispatch(addMember(false))}>Cancel</Button>
                        <Button htmlType="submit" loading={creating} type="primary">Save</Button>
                    </Space>
                </Item>
                
            </Form>

        </Drawer>
    )
}

export default CreateMemberForm