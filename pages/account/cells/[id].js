import React from 'react'
import Layout from '../../../components/layout'
import {Card,Table,Button,Row,Col} from 'antd'



const Index = ()=>{

    const column = [
        {
            title:"ID",
            dataIndex:"id",
            render:(_,{id})=>id
        },
        {
            title:"Full Name",
            dataIndex:"fullName",
            render:(_,{firstName,lastName})=>firstName+' '+lastName
        },
        {
            title:"Gender",
            dataIndex:"gender",
        },
        {
            title:"Phone",
            dataIndex:"phone",
        },
        {
            title:"Marital Status",
            dataIndex:"maritalStatus",
        },
        {
            title:"DOB",
            dataIndex:"dateOfBirth",
        }
    ]


    return(
        <Layout>
            <Card>
                <Row style={{marginBottom:"20px"}}>
                    <Col span={24}>
                        <Button type="primary">Assign Member</Button>
                    </Col>
                </Row>
                <Table columns={column}/>
            </Card>
        </Layout>
    )
}

export default Index