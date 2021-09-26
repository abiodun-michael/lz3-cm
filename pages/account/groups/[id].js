import React,{useState} from 'react'
import {Row,Col,Card,Table,Button,Dropdown,Menu,Popconfirm, message} from 'antd'
import {GET_ALL_CHURCH,GET_CHURCH_BY_ID,DELETE_CHURCH} from '../../../graphql/Church'
import CreateChurchForm from '../../../components/group/CreateChurchForm'
import UpdateChurchForm from '../../../components/group/UpdateChurchForm'
import { useMutation, useQuery } from '@apollo/client'
import FeatherIcon from 'feather-icons-react'
import Layout from '../../../components/layout'
import Router from 'next/router'
import Link from 'next/link'

const {Item} = Menu

const Index = ({id})=>{
    const [open, setOpen] = useState({
        add:false,
        update:false,
        id:null
    })


    const column = [
        {
            title:"ID",
            dataIndex:"id",
            render:(_,{id})=>'CZV1-'+id
        },
        {
            title:"Name",
            dataIndex:"name"
        },
        {
            title:"# of Members",
            dataIndex:"noOfMembers"
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
                        <Item key="1">
                            <Link href="/account/groups/church/[id]"
                                as={`/account/groups/church/${id}`}><a>Members</a></Link>
                        </Item>
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

    const {data,loading,refetch} = useQuery(GET_ALL_CHURCH,{variables:{groupId:parseInt(id)}})
    const {data:church} = useQuery(GET_CHURCH_BY_ID,{variables:{id:parseInt(id)}})

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

    return(
        <Layout>
            <div style={{height:20,display:"flex", alignItems:"center", gap:10, marginBottom:"20px"}}>
                <FeatherIcon icon="arrow-left" onClick={()=>Router.back()} style={{cursor:"pointer"}}/> <h3 style={{margin:0}}>{church?.getChurchById?.name}</h3>
            </div>
            <Card>
                <Row>
                    <Col span={24}>
                        <Button type="primary" onClick={()=>setOpen({...open,add:true})}>Create Church</Button>
                    </Col>
                </Row>
                <Table 
                    columns={column}
                    dataSource={data?.getAllChurch}
                    loading={loading}
                    rowKey="id"/>
            </Card>
            <CreateChurchForm groupId={id} refetch={()=>refetch()} open={open.add} close={()=>setOpen({...open,add:false})}/>
            <UpdateChurchForm id={open.id} refetch={()=>refetch()} open={open.update} close={()=>setOpen({...open,update:false,id:null})}/>
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