import React,{useState} from "react";
import {Drawer,Form,Input,Select,Button,Space, message,Spin} from 'antd'
import { GET_ADMIN_BY_ID, UPDATE_ADMIN } from '../../graphql/Admins'
import { useMutation,useQuery } from "@apollo/client";



const Index = ({onClose=()=>{}, open,id})=>{
    const {Item} = Form
    const [form] = Form.useForm();

    const [edit, setEdit] = useState(false)


const {loading} = useQuery(GET_ADMIN_BY_ID,{
    onCompleted({getAdminById}){
        if(getAdminById){
            const {name,email,id,phone} = getAdminById
            form.setFieldsValue({name,email,phone,id})
        }
        
    },
    variables:{id}})

const [updateAdmin,{loading:updating}] = useMutation(UPDATE_ADMIN,{
    onCompleted({updateAdmin}){
        if(updateAdmin.status){
            message.success(updateAdmin.message)
            onClose()
        }else{
            message.error(updateAdmin.message)
         
        }
    }
})


const handleFinish = (input)=>{
    const {id,name,email,phone,role} = input
console.log(input)
    updateAdmin({variables:{name,email,phone,id,permission:{role,service:"cm"}}})
}

    return(
        <>
            <Drawer width={450} onClose={()=>onClose()} visible={open} title="Edit Manager">
                
                {
                    loading ? <div style={{height:200, display:"flex", alignItems:"center", justifyContent:"center"}}><Spin/></div>:
                
                <Form layout="vertical" form={form}
                    requiredMark={false} onFinish={(e)=>handleFinish(e)}>
                    <Item label="Name" name="name"
                        rules={[{message:"Name is required", required:true}]}>
                        <Input placeholder="e.g. Abiodun Michael" disabled={!edit}/>
                    </Item>
                    <Item label="Name" hidden name="id"
                        rules={[{message:"Name is required", required:true}]}>
                        <Input />
                    </Item>
                    <Item label="Email" name="email"
                         rules={[{message:"Email is required", required:true}]}>
                        <Input type="email" placeholder="e.g mail@mail.com"  disabled={!edit}/>
                    </Item>
                    <Item label="Phone" name="phone"
                         rules={[{message:"Phone is required", required:true}]}>
                        <Input type="tel" placeholder="e.g 2348181842799"  disabled={!edit}/>
                    </Item>
                    <Item label="Role" name="role"
                         rules={[{message:"Phone is required", required:true}]}>
                        <Select  disabled={!edit}
                            options={[{label:"Admin",value:"ADMIN"},{label:"Editor",value:"EDITOR"}]}
                            placeholder="Choose an option"/>
                    </Item>
                    <Item>
                    <Space style={{display:"flex", justifyContent:"flex-end"}}>
                        {
                            !edit ?
                            <Button onClick={()=>setEdit(true)}>Edit</Button>:
                            <>
                             <Button onClick={()=>onClose()}>Cancel</Button>
                        <Button htmlType="submit" loading={updating} type="primary">Save</Button>
                    
                            </>
                        }
                       </Space> 
                    </Item>
                </Form>
}
            </Drawer>
        </>
    )
}

export default Index