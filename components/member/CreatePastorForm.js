import React from 'react'
import { Button, Drawer,Form,Input,message,Select,Row,Col,DatePicker,Radio,Space } from 'antd'
import { useMutation } from '@apollo/client'
import {CREATE_MEMBER,CREATE_ADMIN} from '../../graphql/Member'


const {Item} = Form

const Index = ({open,close=()=>{},refetch,churchId})=>{

    const inviteMessage = ()=>{
        message.loading("Sending invite link...",0)
    }

    const [createAdmin] = useMutation(CREATE_ADMIN,{
        onCompleted({createAdmin}){
            if(createAdmin.status){
                message.success(createAdmin.message)
                inviteMessage()
            }
        }
    })

    const [createMember,{loading}] = useMutation(CREATE_MEMBER,{
        onCompleted({createMember}){
            if(createMember.status){
                refetch()
                close()
                message.success(createMember.message)
                const {firstName,lastName,email,id,phone} = createMember

                createAdmin({variables:{name:firstName+' '+lastName,email,phone,permission:{role:"ADMIN",service:"cm"}}})
                inviteMessage()
            }else{
                message.error(createMember.message)
            }
        }
    })

    return(
        <Drawer width="500" title="Create Pastor" visible={open} onClose={()=>close()}>
              <Form layout="vertical" 
                onFinish={
                    (e)=>createMember({variables:{...e,designation:"PASTOR",
                baptismStatus:true,foundationSchoolStatus:"GRADUATED",
                churchId:parseInt(churchId)
                }})
            }
                requiredMark={false}>
                <Item label="First Name" name="firstName"
                    rules={[{message:"First name is required", required:true}]}>
                    <Input placeholder="Enter first name" size="large"/>
                </Item>
                <Item label="Last Name" name="lastName"
                    rules={[{message:"Last name is required", required:true}]}>
                    <Input placeholder="Enter last name" size="large"/>
                </Item>
                <Item label="Gender" name="gender"
                rules={[{message:"Gender is required", required:true}]}>
                   <Radio.Group optionType="button"
                    options={[{label:"Male", value:"MALE"}, {label:"Female", value:"FEMALE"}]}/>
                </Item>
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
               
                <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        <Button htmlType="submit" loading={loading} type="primary">Save</Button>
                    </Space>
                </Item>
                
            </Form>
        </Drawer>
    )
}

export default Index