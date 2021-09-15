import React from 'react'
import Layout from '../../../components/layout'
import { Card,Table,Button,Row,Col,PageHeader,Dropdown,Menu,Timeline } from 'antd'
import { MoreOutlined,ClockCircleOutlined } from '@ant-design/icons'
import { addFdtsReport, addMember } from '../../../redux/slices/drawer'
import { useDispatch } from 'react-redux'

const Index = ()=>{

    

        const dispatch = useDispatch()

    return(
       
        <Layout>
            <PageHeader
            title="Foundation School Info"
           />
            <Card>
               <Row>
                   <Col span={24}>
                       <Button type="primary" onClick={()=>dispatch(addMember(true))}>Add Student</Button>
                   </Col>
               </Row>
               
               <Timeline mode="left" style={{marginTop:"50px"}}>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                    laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                    beatae vitae dicta sunt explicabo.
                    </Timeline.Item>
                    <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                    Technical testing 2015-09-01
                    </Timeline.Item>
                </Timeline>
            </Card>

        </Layout>
      
    )
}

export default Index