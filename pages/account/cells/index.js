import React from 'react'
import Layout from '../../../components/layout'
import { Card,Table,Button,Row,Col,Dropdown,Menu } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { addCell } from '../../../redux/slices/drawer'
import { useDispatch } from 'react-redux'


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
                dataIndex:"leader"
            },
            {
                title: '',
                dataIndex: 'operation',
                render:(record)=>(
                    <Dropdown  placement="topRight" arrow overlay={
                        (
                            <Menu>
                              <Menu.Item>
                               View Members
                              </Menu.Item>
                              <Menu.Item onClick={()=>dispatch(updateMember({open:true, id:record?.id}))}>
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

        const data = [
            {
                id:1000,
                name:"Unique",
                totalMember:10,
                leader:"Abiodun Michael"
            }
        ]

        const dispatch = useDispatch()

    return(
       
        <Layout>
            <Card>
                <Row style={{marginBottom:"20px"}}>
                    <Col span={24}>
                        <Button onClick={()=>dispatch(addCell(true))} type="primary">Add Cell</Button>
                    </Col>
                </Row>
               
                <Table columns={column} dataSource={data} Layout="auto"/>
            </Card>
        </Layout>
      
    )
}

export default Members