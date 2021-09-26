import { Button, Dropdown,Menu,Drawer,Form,Input,Select, message, Popconfirm } from 'antd'
import React,{useState} from 'react'
import style from './index.module.scss'
import FeatherIcon from 'feather-icons-react'
import { CREATE_ADMIN,GET_ALL_ADMIN_BY_CHURCH_ID,DELETE_ADMIN,REVOKE_ADMIN,RESET_PASSWORD } from '../../graphql/Member'
import { useMutation,useQuery } from '@apollo/client'


const {Item,Divider} = Menu


const Index = ({id})=>{
    const [modal,setModal] = useState({
        add:false
    })
    
    const {data,loading,refetch} = useQuery(GET_ALL_ADMIN_BY_CHURCH_ID,{variables:{id:parseInt(id)}})

    const [createAdmin,{loading:creating}] = useMutation(CREATE_ADMIN,{
        onCompleted({createAdmin}){
            if(createAdmin.status){
                refetch()
                message.success(createAdmin.message)
                setModal({...modal,add:false})
            }else{
                message.error(createAdmin.message)
            }
        }
    })

    const [deleteAdmin] = useMutation(DELETE_ADMIN,{
        onCompleted({deleteAdmin}){
            if(deleteAdmin.status){
                refetch()
                message.success(deleteAdmin.message)
            }else{
                message.error(deleteAdmin.message)
            }
        }
    })
    const [revokeAccount] = useMutation(REVOKE_ADMIN,{
        onCompleted({revokeAccount}){
            if(revokeAccount.status){
                refetch()
                message.success(revokeAccount.message)
            }else{
                message.error(revokeAccount.message)
            }
        }
    })
    const [resetPassword] = useMutation(RESET_PASSWORD,{
        onCompleted({resetPassword}){
            if(resetPassword.status){
                refetch()
                message.success(resetPassword.message)
            }else{
                message.error(resetPassword.message)
            }
        }
    })

    const handleCreate = (e)=>{
        const {name,email,phone,permission} = e
        createAdmin({variables:{name,email,phone,permission:{role:permission,service:"cm"},churchId:parseInt(id)}})
    }
    

    return(
        <>
        <div className={style.section}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <h3>Managers</h3>
                <Button style={{width:"auto"}} 
                    type="primary" onClick={()=>setModal({...modal,add:true})}>Add Manager</Button>
            </div>
            
            <ol>
                {
                    loading ? <p>Loading...</p>:
                    data?.getAllAdminByChurchId?.map(({name,email,id,status,code,permission},i)=>(
                        <li key={i}>
                        <div>
                            {name} ({permission?.role}) {
                                !status && code != null ? <span className="status status-shade2">PENDING</span>:
                                status && code == null ? <span className="status status-success">ACTIVE</span>:
                                !status && code == null ? <span className="status status-error">REVOKED</span>:null
                            }<br />
                            <span  className="text-muted">{email}</span> 
                            
                            
                        </div>
                  
                            <Dropdown arrow placement="topCenter" overlay={(
                                <Menu>
                                    <Item key="1">
                                    <Popconfirm title="Are you sure?"
                                            onConfirm={()=>{
                                                const hide = message.loading("Reseting...",0)
                                                resetPassword({variables:{id:parseInt(id)}}).then(()=>{
                                                    hide()
                                                })
                                            }}>Reset Account</Popconfirm>
                                    </Item>
                                    <Item key="1">
                                    <Popconfirm title="This action cannot be reversed. Do you want to continue?"
                                            onConfirm={()=>{
                                                const hide = message.loading("Revoking...",0)
                                                revokeAccount({variables:{id:parseInt(id)}}).then(()=>{
                                                    hide()
                                                })
                                            }}>Revoke</Popconfirm>
                                    </Item>
                                    <Divider />
                                    <Item key="1" style={{color:"red"}}>
                                        <Popconfirm title="This action cannot be reversed. Do you want to continue?"
                                            onConfirm={()=>{
                                                const hide = message.loading("Deleting...",0)
                                                deleteAdmin({variables:{id:parseInt(id)}}).then(()=>{
                                                    hide()
                                                })
                                            }}>Delete</Popconfirm>
                                    </Item>
                                </Menu>
                            )}>
                            <FeatherIcon size={14} icon="settings"/>
                            </Dropdown>
                    </li>
                    ))
                    
                }
               
            </ol>
        </div>

        <Drawer width={400} title="Invite Admin" visible={modal.add} onClose={()=>setModal({...modal, add:false})}>
            <Form layout="vertical" requiredMark={false} onFinish={(e)=>handleCreate(e)}>
                <Form.Item name="name" label="Name*" 
                    rules={[{message:"Manager Name is compulsory", required:true}]}>
                    <Input placeholder="Enter name"/>
                </Form.Item>
                <Form.Item name="email" label="Email*" 
                    rules={[{message:"Manager Email is compulsory", required:true}]}>
                    <Input type="email" placeholder="Enter Email address"/>
                </Form.Item>
                <Form.Item name="phone" label="Phone*" 
                    rules={[{message:"Manager Phone is compulsory", required:true}]}>
                    <Input type="tel" placeholder="Enter Phone Number"/>
                </Form.Item>
                <Form.Item name="permission" label="Permission*" 
                    rules={[{message:"Permission is compulsory", required:true}]}>
                    <Select placeholder="Choose an option"
                        options={[{label:"Admin",value:"Admin"},{label:"Editor",value:"Editor"}]}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={creating}>Invite</Button>
                </Form.Item>
            </Form>
        </Drawer>
        </>
    )
}

export default Index