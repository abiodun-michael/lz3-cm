import React from 'react'
import {Button, Card,Table, Row, Col,message} from 'antd'
import { useQuery,useMutation } from '@apollo/client'
import { GET_ALL_ADMIN,DELETE_ALL } from '../../graphql/Admins'
import {EllipsisOutlined} from '@ant-design/icons'

const Index = ({onClick=()=>{}, onItemClick=()=>{}})=>{

    const {data, loading} = useQuery(GET_ALL_ADMIN,{
        onError(err){
          if(err){
              message.error("An error occured")
          }
        }
    })

    const [deleteAll] = useMutation(DELETE_ALL,{
        onCompleted({deleteAll}){
            if(deleteAll.status){
                message.success(deleteAll.message)
            }else{
                message.error(deleteAll.message)
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
                  )},
        {
            title:"",
            dataIndex:"action",
            render:(_,record)=><EllipsisOutlined onClick={()=>onItemClick(record)}/>
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