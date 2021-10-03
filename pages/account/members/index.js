import React,{useState} from 'react'
import Layout from '../../../components/layout'
import { Card,Table,Button,Row,Col,Dropdown,Popconfirm,Menu,message } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import { addMember,updateMember } from '../../../redux/slices/drawer'
import { useDispatch } from 'react-redux'
import { GET_ALL_MEMBER,DELETE_MEMBER } from '../../../graphql/Member'
import { useQuery,useMutation } from '@apollo/client'
import Link from 'next/link'
import moment from 'moment'

const Members = ()=>{

    const [id,setId] = useState(0)

    const [deleteMember] = useMutation(DELETE_MEMBER)

        const column = [
            {
                title:"ID",
                key:"id",
                dataIndex:"id",
                responsive: ['md']
            },
            {
                title:"Title",
                key:"title",
                dataIndex:"designation"
            },
            {
                title:"Full Name",
                key:"fullName",
                dataIndex:"fullName",
                render:(_,{firstName,lastName})=>firstName +' '+lastName
            },
            {
                title:"Phone",
                key:"phone",
                dataIndex:"phone",
                responsive: ['md']
            },
            {
                title:"Marital Status",
                key:"maritalStatus",
                responsive: ['md'],
                render:(_,{maritalStatus})=>(
                    maritalStatus == "SINGLE" ? <span className="status status-shade2">SINGLE</span>:
                    maritalStatus == "MARRIED" ? <span className="status status-success">MARRIED</span>:
                    maritalStatus == "DIVORCED" ? <span className="status status-error">SINGLE</span>:
                    <span className="status status-shade1">{maritalStatus}</span>
                )
            },
            {
                title:"Gender",
                key:"gender",
                responsive: ['md'],
                render:(_,{gender})=>(
                    gender == "MALE" ? <span className="status status-success">MALE</span>:
                    <span className="status status-shade1">FEMALE</span>
                )
                
            },
            {
                title:"DOB",
                key:"birthday",
                responsive: ['md'],
                // render:(_,{dateOfBirth})=>moment(dateOfBirth,'x').format("Do, MMM YYYY")
            },
            {
                title: '',
                dataIndex: 'operation',
                render:(_,{id,firstName})=>(
                    <Dropdown  placement="topRight" arrow overlay={
                        (
                            <Menu>
                              <Menu.Item>
                               <Link href="/account/members/[id]" as={`/account/members/${id}`}><a>View Profile</a></Link>
                              </Menu.Item>
                              <Menu.Item onClick={()=>dispatch(updateMember({open:true, id:id}))}>
                                Edit
                              </Menu.Item>
                              <Menu.Divider/>
                              <Menu.Item>
                                <Popconfirm title={`Sure you want to delete ${firstName}`}
                                    onConfirm={()=>{
                                        const hide =  message.loading(`Deleting ${firstName}...`,0)
                                        deleteMember({variables:{id},
                                        update(cache,{data}){

                                            if(data.deleteMember.status){
                                                hide()
                                                const normalizedId = cache.identify({ id, __typename: 'Member' });
                                                cache.evict({ id: normalizedId });
                                                cache.gc();
                                            }else{
                                                message.error(data.deleteMember.message)
                                            }
                                           
                                        }})
                                    }}>
                                    Delete
                                </Popconfirm>
                              </Menu.Item>
                            </Menu>
                          )
                    }>
                        <MoreOutlined />
                    </Dropdown>)
                
              },
        ]

       

        const dispatch = useDispatch()

        const {data, loading} = useQuery(GET_ALL_MEMBER)
        


    return(
       
        <Layout>
            <Card>
                <Row style={{marginBottom:"20px"}} gutter={10}>
               
                    <Col md={12} sm={0}>
                        <Button onClick={()=>dispatch(addMember(true))} type="primary">Add Member</Button>
                    </Col>
                    {/* <Col md={8} sm={6}>
                    <Input placeholder="Search" type="search"/>
                    </Col>
                    <Col md={4} sm={6}>
                       <Select style={{width:"100%"}}
                        placeholder="Cell"
                        options={[{label:"Unique", value:"Unique"},{label:"Dominion", value:"Dominion"}]}/>
                    </Col> */}
                </Row>
               
                <Table loading={loading} columns={column} dataSource={data?.getAllMember} Layout="auto"/>
            </Card>

        </Layout>
      
    )
}

export default Members