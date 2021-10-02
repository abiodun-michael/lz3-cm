import React,{useState} from 'react'
import {Button, Table,Modal, Form, Input,InputNumber, message } from 'antd'
import {CREATE_GIVING,GET_ALL_GIVING_BY_CHURCH} from '../../graphql/Finance'
import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'

const Index = ({id})=>{

    const [state,setState] = useState(false)

        const column = [
            {
                title:"ID",
                key:"id",
                dataIndex:"id"
            },
            {
                title:"Amount",
                key:"amount",
                render:(_,{amount})=><span>&#8358; {amount.toLocaleString()}</span>
            },
            {
                title:"Submitted by",
                key:"submittedBy",
                render:(_,{createdBy})=>createdBy.name
            },
            {
                title:"Date",
                key:"createdAt",
                render:(_,{createdAt})=>moment(createdAt,'x').format("Do, MMM YYYY")
            },
            {
                title:"Status",
                key:"status",
                render:(_,{status})=>(
                    status == "PENDING" ? <span className="status status-error">Not Verified</span>:
                    status == "VERIFIED" ? <span className="status status-inactive">Verified</span>:
                    status == "PAID" ? <span className="status status-success">Paid</span>:
                    <span className="status status-success">Approved</span>
                )
            },
        ]

        const {data,loading} = useQuery(GET_ALL_GIVING_BY_CHURCH,{variables:{ticketId:parseInt(id)}})

        const [createGiving,{loading:creating}] = useMutation(CREATE_GIVING,{
            update(cache,{data:{createGiving}}){
                const newEntry = createGiving.giving
                const existingEntry  = cache.readQuery({query:GET_ALL_GIVING_BY_CHURCH})
                if(newEntry && existingEntry){
                    cache.writeQuery({
                        query:GET_ALL_GIVING_BY_CHURCH,
                        data:{
                            getAllGivingByChurch:[...existingEntry.getAllGivingByChurch,newEntry]
                        }
                    })
                }
            },
            onCompleted({createGiving}){
                if(createGiving.status){
                    message.success(createGiving.message)
                    setState(false)
                }else{
                    message.error(createGiving.message)
                }
            }
        })
    return(
        <>
       {
           data?.getAllGivingByChurch?.length == 0 ?
        <Button type="primary" onClick={()=>setState(true)}>New Record</Button>:null}
        <Table columns={column} dataSource={data?.getAllGivingByChurch}/>

        <Modal 
            width={400}
            visible={state} 
            onCancel={()=>setState(false)} 
            footer={null} 
            title="New Giving Report">
                <Form layout="vertical" 
                    requiredMark={false} 
                    onFinish={(e)=>createGiving({variables:{amount:parseFloat(e.amount),ticketId:parseInt(id)}})}>
                    <Form.Item label="Amount" name="amount" 
                        rules={[{message:"Amount must be specified", required:true, min:2}]}>
                        <Input type="number" placeholder="Enter amount"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={creating} htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
        </Modal>
        </>
    )
}

export default Index