import React,{useState} from 'react'
import {Row,Col,Card,Table,Button,Dropdown,Menu,Tabs, message} from 'antd'
import {GET_ALL_MEMBER_BY_CHURCH_ID} from '../../../../graphql/Member'
import {GET_CHURCH_BY_ID} from '../../../../graphql/Church'
import CreatePastorForm from '../../../../components/member/CreatePastorForm'
import { useMutation, useQuery } from '@apollo/client'
import FeatherIcon from 'feather-icons-react'
import Layout from '../../../../components/layout'
import Router from 'next/router'
import Link from 'next/link'
import MakeAdmin from '../../../../components/member/MakeAdmin'
import AssignPastor from '../../../../components/member/AssignPastor'

const {Item} = Menu
const {TabPane} = Tabs

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
            render:(_,{id})=>(
                <Link href="/account/groups/church/[id]"
                as={`/account/groups/church/${id}`}><a>M1-{id}</a></Link>)
        },
        {
            title:"Title",
            dataIndex:"designation"
        },
        {
            title:"Full Name",
            render:(_,{firstName,lastName})=>firstName+' '+lastName
        },
        {
            title:"Gender",
            dataIndex:"gender"
        },
        {
            title:"Marital Status",
            render:(_,{maritalStatus})=>(
                maritalStatus == "SINGLE"? <span className="status status-shade2">SINGLE</span>:
                maritalStatus == "MARRIED" ? <span className="status status-success">MARRIED</span>:
                maritalStatus == "DIVORCED" ? <span className="status status-error">MARRIED</span>:
                <span className="status status-inactive">{maritalStatus}</span>
            )
        },
        {
            title:"Phone",
            dataIndex:"phone"
        },
        {
            title:"Email",
            dataIndex:"email"
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
                       
                       
                    </Menu>
                )}><FeatherIcon size={15} icon="more-vertical"/></Dropdown>
            )
        }
        
    ]

    const {data,loading,refetch} = useQuery(GET_ALL_MEMBER_BY_CHURCH_ID,{variables:{id:parseInt(id)}})
    const {data:church,refetch:refetchPastor} = useQuery(GET_CHURCH_BY_ID,{variables:{id:parseInt(id)}})

   
    return(
        <Layout>
            <div style={{height:20,display:"flex", alignItems:"center", gap:10, marginBottom:"20px"}}>
                <FeatherIcon icon="arrow-left" onClick={()=>Router.back()} style={{cursor:"pointer"}}/> <h3 style={{margin:0}}>{church?.getChurchById?.name}</h3>
            </div>
            <Card>
                <Tabs defaultActiveKey="1">
                    {/* <TabPane tab="Analytics" key="1">
                       <p>No data</p>
                    </TabPane> */}
                    <TabPane tab="Members" key="1">
                    <Row>
                        <Col span={24}>
                            <Button type="primary" onClick={()=>setOpen({...open,add:true})}>Add Pastor</Button>
                        </Col>
                        </Row>
                        <Table 
                            columns={column}
                            dataSource={data?.getAllMemberByChurchId}
                            loading={loading}
                            rowKey="id"/>
                    </TabPane>
                    <TabPane tab="Settings" key="2">
                        <MakeAdmin id={id}/>
                        <AssignPastor id={id}  refetch={()=>refetchPastor()}   pastor={church?.getChurchById?.pastor} />
                    </TabPane>
                </Tabs>
               
            </Card>
            <CreatePastorForm churchId={id} refetch={()=>refetch()} open={open.add} close={()=>setOpen({...open,add:false})}/>
          
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