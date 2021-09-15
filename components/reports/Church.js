import React from 'react'
import { Table } from 'antd'


const Index = ()=>{

    const column = [
        {
            title:"ID",
            dataIndex:"id"
        },
        {
            title:"Ticket Name",
            dataIndex:"ticketName"
        },
        {
            title:"Total Att.",
            dataIndex:"totalAttenance"
        },
        {
            title:"Submission",
            dataIndex:"submission"
        },
        {
            title:"Status",
            dataIndex:"status"
        },
        {
            title:"",
            dataIndex:"operation",
            render:()=>'...'
        }
    ]

    const data = [
        {
            id:1,
            ticketName:"Week 4",
            totalAttenance:10,
            submission:"ACTIVE",
            status:"PENDING"
        }
    ]

    return(
        <>
            <Table columns={column} dataSource={data}/>
        </>
    )
}

export default Index