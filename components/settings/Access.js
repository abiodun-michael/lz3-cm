import React from 'react'
import {Button, Card,Table, Row, Col,message,Menu,Dropdown,Popconfirm} from 'antd'
import FeatherIcon from 'feather-icons-react'
import { useQuery,useMutation } from '@apollo/client'
import { GET_ALL_ADMIN,REVOKE_ACCOUNT,DELETE_ADMIN,RESET_PASSWORD } from '../../graphql/Admins'


const Index = ({onClick=()=>{}, onItemClick=()=>{}})=>{

    const {data, loading} = useQuery(GET_ALL_ADMIN,{
        onError(err){
          if(err){
              message.error("An error occured")
          }
        }
    })

    const [revokeAccount] = useMutation(REVOKE_ACCOUNT,{
        onCompleted({revokeAccount}){
            if(revokeAccount.status){
                message.success(revokeAccount.message)
            }else{
                message.error(revokeAccount.message)
            }
        }
    })
    const [deleteAdmin] = useMutation(DELETE_ADMIN)

    const [resetPassword] = useMutation(RESET_PASSWORD,{
        onCompleted({resetPassword}){
            if(resetPassword.status){
                message.success(resetPassword.message)
            }else{
                message.error(resetPassword.message)
            }
        }
    })

    const columns = [
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"Email",
            dataIndex:"email"
        },
        {
            title:"Phone",
            dataIndex:"phone"
        },
        {
            title:"Role",
            dataIndex:"role"
        },
        {
            title:"Status",
            dataIndex:"status",
            render:(_,record)=>(
                record.status ?
                <span className="status status-success">Active</span>:
                 <span className="status status-inactive">Pending</span>
                  )
        },
        {
            title:"",
            dataIndex:"action",
            render:(_,{id})=>( <Dropdown  placement="topRight" arrow overlay={
                (
                    <Menu>
                      <Menu.Item key={1} onClick={()=>onItemClick(id)}>
                      Edit Info
                      </Menu.Item>
                      <Menu.Item key={2}>
                      <Popconfirm title="Sure to send reset link?" onConfirm={()=>{
                           const hide =  message.loading("Sending reset link...",0)
                           resetPassword({variables:{id}}).then(()=>{
                               hide()
                           })
                        }}>
                            Reset Password
                        </Popconfirm>
                      </Menu.Item>
                     
                      <Menu.Divider/>
                      <Menu.Item key={3}>
                        <Popconfirm title="Sure to revoke access?" onConfirm={()=>{
                           const hide =  message.loading("Revoking access",0)
                           revokeAccount({variables:{id}}).then(()=>{
                               hide()
                           })
                        }}>
                            Revoke Access
                        </Popconfirm>
                      </Menu.Item>
                      <Menu.Item key={4}>
                        <Popconfirm title="Sure to delete account?"onConfirm={()=>{
                           const hide =  message.loading("Deleting account",0)
                           deleteAdmin({variables:{id},
                                update(cache,{data}){
                                        if(data.deleteAdmin.status){
                                        hide()
                                        const normalizedId = cache.identify({ id, __typename: 'Admin' });
                                        cache.evict({ id: normalizedId });
                                        cache.gc();
                                    }else{
                                        message.error(data.deleteAdmin.message)
                                    }
                                }})
                        }} >
                            Delete Account
                        </Popconfirm>
                      </Menu.Item>
                    </Menu>
                  )
            }>
                <FeatherIcon size={13} icon="more-vertical" />
            </Dropdown>)
        }
    ]

    return(
        <>
        <Row>
            <Col md={24} sm={24}>
            <Button onClick={()=>onClick()} 
                style={{height:"35px", marginBottom:20}} 
                type="primary">Add User</Button>
                
                <Table columns={columns} dataSource={data?.getAllAdmin} loading={loading}/>
       
            </Col>
        </Row>
        
        </>
    )
}

export default Index