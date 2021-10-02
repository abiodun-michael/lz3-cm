import React,{useState} from 'react'
import Layout from '../../../components/layout'
import Giving from '../../../components/finance/Givings'
import { Card,Tabs,Button,Row,Col,Dropdown,Popconfirm,Menu,message,Timeline } from 'antd'
import { useQuery,useMutation } from '@apollo/client'
import Link from 'next/link'


const {TabPane} = Tabs
const Index = ({id})=>{


    return(
       
        <Layout>
        <Card>
        <Tabs defaultActiveKey="1">
        <TabPane tab="Givings" key="1" style={{paddingTop:10}}>
          <Giving id={id}/>
        </TabPane>
        {/* <TabPane tab="Partnership" key="2">
          Content of Tab Pane 2
        </TabPane> */}
       
      </Tabs>

        </Card>    

        </Layout>
      
    )
}
export async function getServerSideProps({query}) {

    const id = query?.id
    
      return {
        props: {id}
      }
    }

export default Index