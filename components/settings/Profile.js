import React,{useState} from 'react'
import {Form,Input, Row, Col,Select,Space,Button, message} from 'antd'
import { GET_CHURCH_PROFILE,UPDATE_CHURCH_PROFILE } from '../../graphql/Church'
import { useQuery,useMutation } from '@apollo/client'

const {Item} = Form

const churchOptions = [
    {label:"Church", value:"CHURCH"},
    {label:"Language", value:"LANGUAGE"},
    {label:"Children", value:"CHILDREN"},
    {label:"Teens", value:"TEENS"},
    {label:"Youth", value:"YOUTH"}
]

const Index = ()=>{
    const [form] = Form.useForm();

    const [edit, setEdit] = useState(false)

    const {loading} = useQuery(GET_CHURCH_PROFILE,{
        onCompleted({getChurchProfile}){
            if(getChurchProfile){
                const {name,address,longitude,latitude,type} = getChurchProfile
                form.setFieldsValue({name,address,longitude,latitude,type})
            }
        }
    })

    const [updateChurchProfile, {loading:updating}] = useMutation(UPDATE_CHURCH_PROFILE,{
        onCompleted({updateChurchProfile}){
            if(updateChurchProfile.status){
                message.success(updateChurchProfile.message)
            }else{
                message.error(updateChurchProfile.message)
            }
        }
    })

    const handleSubmit = (e)=>{
        const {name,address,latitude,longitude,type} = e
        updateChurchProfile({variables:{name,address,latitude,longitude,type}})
    }

    return(
        <>
        <div style={{marginTop:20}}>
            <p className="text-muted">Here you will be able to update all your church information.</p>

            <Row>
                <Col md={12} sm={24}>
                    <Form layout="vertical" form={form} onFinish={(e)=>handleSubmit(e)}>
                        <h4 style={{marginBottom:20, marginTop:20}}>Basic Info</h4>
                        <Item label="Church Name" name="name">
                            <Input disabled={!edit} placeholder="Enter your church name"/>
                        </Item>
                       
                        <Item label="Church Type" name="type">
                            <Select disabled={!edit} placeholder="Select Church Type" options={churchOptions}/>
                        </Item>
                        <h4 style={{marginBottom:20, marginTop:40}}>Location Info</h4>
                        <Item label="Church Address" name="address">
                            <Input disabled={!edit} placeholder="Enter your church address"/>
                        </Item>
                        <Item label="Longitude" name="longitude">
                            <Input disabled={!edit} placeholder="Enter your church longitude"/>
                        </Item>
                        <Item label="Latitude" name="latitude">
                            <Input disabled={!edit} placeholder="Enter your church latitude"/>
                        </Item>
                        <Item>
                        <Space style={{display:"flex", justifyContent:"flex-end"}}>
                            {
                                !edit ? <Button onClick={()=>setEdit(true)}>Edit</Button>:
                          
                                    <Button htmlType="submit" loading={updating}  type="primary">Save</Button>
                           
                            }
                            
                    </Space> 
                        </Item>
                    </Form>
                </Col>
            </Row>
            
        </div>
        
        </>
    )
}

export default Index