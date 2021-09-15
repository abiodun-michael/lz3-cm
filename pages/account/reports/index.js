import React from 'react'
import Layout from '../../../components/layout'
import { Card,Tabs } from 'antd'
import Fdts from '../../../components/reports/Fdts'

const {TabPane} = Tabs

const Reports = ()=>{


    return(
        <Layout>
            <Card>
            <Tabs defaultActiveKey="1">
                {/* <TabPane tab="Church" key="1" style={{paddingTop:20}}><Church /></TabPane>
                <TabPane tab="Cell" key="2" style={{paddingTop:20}}></TabPane>
                <TabPane tab="Partnership" key="3" style={{paddingTop:20}}></TabPane> */}
                <TabPane tab="FDTS" key="1" style={{paddingTop:20}}><Fdts /></TabPane>
            </Tabs>
            </Card>

        </Layout>
    )
}

export default Reports