import React from 'react'
import {Row,Col} from 'antd'
import Layout from '../../../components/layout'
import {Header,Growth, Gender,Marital} from '../../../components/analytics'

const Index = ()=>{

    return(
        <Layout>
            <Header />
            <Row gutter={10}>
                <Col md={14}>
                    <Growth />
                </Col>
                <Col md={10}>
                   <Gender />
                   <Marital />
                </Col>
            </Row>

        </Layout>
    )
}

export default Index