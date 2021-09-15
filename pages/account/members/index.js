import React from 'react'
import Layout from '../../../components/layout'
import { Card,Table,Button,Row,Col,Input,Dropdown,Menu,Select } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { addMember,updateMember } from '../../../redux/slices/drawer'
import { useDispatch } from 'react-redux'
import { GET_ALL_MEMBER,CREATE_MEMBER } from '../../../graphql/Member'
import { useQuery,useMutation } from '@apollo/client'
import Link from 'next/link'

const Members = ()=>{

        const column = [
            {
                title:"ID",
                key:"id",
                dataIndex:"id",
                responsive: ['md']
            },
            {
                title:"Title",
                key:"title",
                dataIndex:"designation"
            },
            {
                title:"Full Name",
                key:"fullName",
                dataIndex:"fullName",
                render:(_,{firstName,lastName})=>firstName +' '+lastName
            },
            {
                title:"Phone",
                key:"phone",
                dataIndex:"phone",
                responsive: ['md']
            },
            {
                title:"DOB",
                key:"birthday",
                dataIndex:"dateOfBirth",
                responsive: ['md']
            },
            {
                title:"Cell",
                key:"cell",
                dataIndex:"cell",
                responsive: ['md']
            },
            {
                title: '',
                dataIndex: 'operation',
                render:(_,{id})=>(
                    <Dropdown  placement="topRight" arrow overlay={
                        (
                            <Menu>
                              <Menu.Item>
                               <Link href="/account/members/[id]" as={`/account/members/${id}`}><a>View Profile</a></Link>
                              </Menu.Item>
                              <Menu.Item onClick={()=>dispatch(updateMember({open:true, id:id}))}>
                                Edit
                              </Menu.Item>
                              <Menu.Divider/>
                              <Menu.Item>
                                Delete
                              </Menu.Item>
                            </Menu>
                          )
                    }>
                        <MoreOutlined />
                    </Dropdown>)
                
              },
        ]

       

        const dispatch = useDispatch()

        const {data, loading} = useQuery(GET_ALL_MEMBER)
        


    return(
       
        <Layout>
            <Card>
                <Row style={{marginBottom:"20px"}} gutter={10}>
               
                    <Col md={12} sm={0}>
                        <Button onClick={()=>dispatch(addMember(true))} type="primary">Add Member</Button>
                    </Col>
                    {/* <Col md={8} sm={6}>
                    <Input placeholder="Search" type="search"/>
                    </Col>
                    <Col md={4} sm={6}>
                       <Select style={{width:"100%"}}
                        placeholder="Cell"
                        options={[{label:"Unique", value:"Unique"},{label:"Dominion", value:"Dominion"}]}/>
                    </Col> */}
                </Row>
               
                <Table loading={loading} columns={column} dataSource={data?.getAllMember} Layout="auto"/>
            </Card>

        </Layout>
      
    )
}

export default Members