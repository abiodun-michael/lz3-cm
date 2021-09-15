import React,{useState} from 'react'
import {Button, Card,Table} from 'antd'
import Layout from '../../../../components/layout'
import SubmitFdtsReport from '../../../../components/reports/SubmitFdtsReport'

const Index = ()=>{
    const [modal, setModal] = useState({
        add:false,
        edit:false
    })

    const column = [
        {
            title:"ID",
            dataIndex:'id'
        },
        {
            title:"Class No.",
            dataIndex:'classNo'
        },
        {
            title:"Total Att.",
            dataIndex:'totalAttendance'
        },
        {
            title:"Class date",
            dataIndex:'classDate'
        },
        {
            title:"Submitted by",
            dataIndex:'submittedBy'
        },
        {
            title:"Submitted",
            dataIndex:'submitted'
        },
        {
            title:"Status",
            dataIndex:'status',
            render:(_,{status})=>(
                status == "PENDING" ? <span className="status status-error">Pending</span>:null
            )
        },
        {
            title:"",
            dataIndex:'operation',
            render:(_,{id})=>'...'
        }
    ]

    const data = [
        {
            id:123,
            classNo:"Class 4",
            totalAttendance:12,
            classDate:"Today",
            submittedBy:"Abiodun Michael",
            submitted:"Today",
            status:"PENDING"
        }
    ]

    return(
        <Layout>
            <Card>
                <Button type="primary" onClick={()=>setModal({...modal,add:true})}>Submit Report</Button>
            <Table columns={column} dataSource={data}/>
            </Card>

            <SubmitFdtsReport open={modal.add} onClose={()=>setModal({...modal,add:false})}/>
        </Layout>
       
    )
}

export default Index