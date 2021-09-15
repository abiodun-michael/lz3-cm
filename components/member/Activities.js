import React from 'react'
import {Button, Card, Col, Row,Space,Tabs} from 'antd'
import { MailOutlined,PhoneOutlined,UserOutlined } from '@ant-design/icons'
import style from './Index.module.scss'
import Partnership from './Partnership'

const Activities = ()=>{

    const { TabPane } = Tabs;
    return(
       
          <Card className={style.section_card}>
              <h3>Activities</h3>
            <Tabs defaultActiveKey="1">
            <TabPane tab="Partnerships" key="1">
                No data to display givings
            </TabPane>
            <TabPane tab="Attendance" key="2">
              No data to display for meetings
            </TabPane>
            <TabPane tab="Others" key="3">
            No data to display for others
            </TabPane>
        </Tabs>,
          </Card>

          
      
    )
}

export default Activities