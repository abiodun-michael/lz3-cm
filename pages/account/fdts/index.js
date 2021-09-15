import React from 'react'
import Layout from '../../../components/layout'
import { Card,Table,Button,Row,Col,PageHeader,Dropdown,Menu } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { addFdtsReport, addMember } from '../../../redux/slices/drawer'
import { useDispatch } from 'react-redux'

const Index = ()=>{

        const column = [
            {
                title:"ID",
                key:"id",
                dataIndex:"id"
            },
            {
                title:"Ticket Name",
                key:"ticketName",
                dataIndex:"ticketName"
            },
            {
                title:"Total Student",
                key:"totalStudent",
                dataIndex:"totalStudent"
            },
            {
                title:"Started",
                key:"started",
                dataIndex:"started"
            },
            {
                title:"Status",
                key:"status",
                dataIndex:"status"
            },
            {
                title: '',
                dataIndex: 'operation',
                render:(record)=>(
                    <Dropdown  placement="topRight" arrow overlay={
                        (
                            <Menu>
                              <Menu.Item>
                               View Details
                              </Menu.Item>
                              <Menu.Item onClick={()=>dispatch(addFdtsReport({open:true, id:record?.id}))}>
                                Submit Report
                              </Menu.Item>
                              <Menu.Divider/>
                              <Menu.Item>
                                  Retract
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
                ticketName:"Third Quater 2021",
                totalStudent:10,
                started:"January 3rd, 2021",
                status:"Completed",
            }
        ]

        const dispatch = useDispatch()

    return(
       
        <Layout>
           
            <Card>
               <Row>
                   <Col span={24}>
                       <Button type="primary" onClick={()=>dispatch(addMember(true))}>Add Student</Button>
                   </Col>
               </Row>
               
                <Table columns={column} dataSource={data} Layout="auto"/>
            </Card>

        </Layout>
      
    )
}

export default Index