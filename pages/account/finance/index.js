import React,{useState} from 'react'
import Layout from '../../../components/layout'
import { Card,Table,Button,Row,Col,Dropdown,Popconfirm,Menu,message } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { addMember,updateMember } from '../../../redux/slices/drawer'
import { useDispatch } from 'react-redux'
import { GET_ALL_TICKET_BY_CHURCH } from '../../../graphql/Ticket'
import { useQuery,useMutation } from '@apollo/client'
import Link from 'next/link'
import moment from 'moment'

const Members = ()=>{

    const [id,setId] = useState(0)


        const column = [
            {
                title:"ID",
                key:"id",
                dataIndex:"id",
                responsive: ['md']
            },
            {
                title:"Ticket Name",
                key:"name",
                render:(_,{id,name})=><Link href='/account/finance/[id]' as={`/account/finance/${id}`}><a>{name}</a></Link>
            },
           
            {
                title:"Deposit",
                key:"mydeposits",
                dataIndex:"mydeposits",
                render:(_,{mydeposits})=><span>&#8358; {mydeposits.toLocaleString()}</span>
    
            },
            {
                title:"Created At",
                key:"createdAt",
                dataIndex:"createdAt",
                render:(_,{createdAt})=>moment(createdAt,'x').format("Do, MMM YYYY")
    
            },
            
            {
                title:"Status",
                key:"status",
                render:(_,{status})=>(
                    status == "ACTIVE" ? <span className="status status-success">OPEN</span>:
                    <span className="status status-inactive">CLOSED</span>
                )
               
            },
          
        ]

        const {data, loading} = useQuery(GET_ALL_TICKET_BY_CHURCH)
        


    return(
       
        <Layout>
            <Card>               
                <Table loading={loading} columns={column} dataSource={data?.getAllTicketByChurch} Layout="auto"/>
            </Card>

        </Layout>
      
    )
}

export default Members