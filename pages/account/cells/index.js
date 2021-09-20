import React from 'react'
import Layout from '../../../components/layout'
import { Card,Table,Button,Row,Col,Dropdown,Menu } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { addCell } from '../../../redux/slices/drawer'
import { useDispatch } from 'react-redux'
import {GET_ALL_CELL} from '../../../graphql/Cell'
import { useQuery } from '@apollo/client'
import Link from 'next/link'


const Members = ()=>{

        const column = [
            {
                title:"ID",
                key:"id",
                dataIndex:"id"
            },
            {
                title:"Name",
                key:"name",
                dataIndex:"name"
            },
            {
                title:"Total Member",
                key:"totalMember",
                dataIndex:"totalMember"
            },
            {
                title:"Leader",
                key:"leader",
                dataIndex:"leader",
                render:(_,{leader})=>leader?.firstName+' '+leader?.lastName
            },
            {
                title: '',
                dataIndex: 'operation',
                render:(_,{id})=>(
                    <Dropdown  placement="topRight" arrow overlay={
                        (
                            <Menu>
                              <Menu.Item>
                                  <Link href="/account/cells/[id]" as={`/account/cells/${id}`}><a>View Member</a></Link>
                              </Menu.Item>
                              <Menu.Item onClick={()=>dispatch(updateMember({open:true, id}))}>
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

        const {data,loading} = useQuery(GET_ALL_CELL)

       

    return(
       
        <Layout>
            <Card>
                <Row style={{marginBottom:"20px"}}>
                    <Col span={24}>
                        <Button onClick={()=>dispatch(addCell(true))} type="primary">Add Cell</Button>
                    </Col>
                </Row>
               
                <Table columns={column} loading={loading} dataSource={data?.getAllCell} Layout="auto"/>
            </Card>
        </Layout>
      
    )
}

export default Members