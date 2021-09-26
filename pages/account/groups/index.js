import React,{useState} from 'react'
import {Row,Col,Card,Table,Button,Dropdown,Menu,Popconfirm,message} from 'antd'
import FeatherIcon from 'feather-icons-react'
import {GET_ALL_GROUP_BY_ZONE_ID,DELETE_CHURCH} from '../../../graphql/Church'
import CreateGroupForm from '../../../components/group/CreateGroupForm'
import UpdateChurchForm from '../../../components/group/UpdateChurchForm'
import { useQuery,useMutation } from '@apollo/client'
import Layout from '../../../components/layout'
import Link from 'next/link'

const {Item} = Menu

const Index = ()=>{
    const [open, setOpen] = useState({
        add:false,
        update:false,
        id:null
    })

    const [deleteChurch] = useMutation(DELETE_CHURCH,{
        onCompleted({deleteChurch}){
            if(deleteChurch.status){
                refetch()
                message.success(deleteChurch.message)
            }else{
                message.error(deleteChurch.message)
            }
        }
    })

    const column = [
        {
            title:"ID",
            dataIndex:"id",
            render:(_,{id})=>(
                <Link href="/account/groups/[id]"
                as={`/account/groups/${id}`}><a>GZV1-{id}</a></Link>)
        },
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"No of Churches",
            dataIndex:"noOfChurches"
        },
        {
            title:"Type",
            dataIndex:"type",
            render:(_,{type})=>(
                type == "CHURCH" ? <span className="status status-success">CHURCH</span>:
                type == "TEENS" ? <span className="status status-error">TEENS</span>:
                type == "LANGUAGE" ? <span className="status status-shade1">LANGUAGE</span>:
                <span className="status status-shade2">{type}</span>
            )
        },
        {
            title:"Address",
            dataIndex:"address"
        },
        {
            render:(_,{id,name})=>(
                <Dropdown arrow placement="topRight" overlay={(
                    <Menu>
                        <Item key="1"><Link href="/account/groups/[id]" as={`/account/groups/${id}`}><a>View Churches</a></Link></Item>
                        <Item key="2" onClick={()=>setOpen({...open, id,update:true})}>Edit</Item>
                        <Menu.Divider/>
                        <Item style={{color:"red"}} key="3">
                            <Popconfirm 
                            onConfirm={()=>{
                                const hide =  message.loading(`Deleting ${name}...`,0)
                                deleteChurch({variables:{id}}).then(()=>{
                                    hide()
                                })
                            }}
                            title={`Are you sure you want to delete ${name}?`}>Delete</Popconfirm>
                        </Item>
                    </Menu>
                )}><FeatherIcon size={15} icon="more-vertical"/></Dropdown>
            )
        }
        
    ]

    const {data,loading,refetch} = useQuery(GET_ALL_GROUP_BY_ZONE_ID,{variables:{zoneId:1}})

    return(
        <Layout>
            
            <Card>
                <Row>
                    <Col span={24}>
                        <Button type="primary" onClick={()=>setOpen({...open,add:true})}>Create Group</Button>
                    </Col>
                </Row>
                <Table 
                    columns={column}
                    dataSource={data?.getAllGroupByZoneId}
                    loading={loading}
                    rowKey="id"/>
            </Card>
            <CreateGroupForm refetch={()=>refetch()} open={open.add} close={()=>setOpen({...open,add:false})}/>
            <UpdateChurchForm id={open.id} refetch={()=>refetch()} open={open.update} close={()=>setOpen({...open,update:false,id:null})}/>
        </Layout>
    )
}

export default Index