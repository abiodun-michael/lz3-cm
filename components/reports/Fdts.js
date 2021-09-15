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
            title:"Students",
            dataIndex:"students"
        },
        {
            title:"Registered",
            dataIndex:"registered"
        },
        {
            title:"Status",
            dataIndex:"status",
            render:(_,{status})=>(
                status == "OPEN" ? 
                <span className="status status-success">Open</span>:
                <span className="status status-inactive">Closed</span>
            )
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
            students:10,
            registered:"Today",
            status:"OPEN"
        },
        {
            id:2,
            ticketName:"Week 3",
            students:10,
            registered:"Last Week",
            status:"CLOSED"
        }
    ]

    return(
        <>
            <Table columns={column} dataSource={data}/>
        </>
    )
}

export default Index