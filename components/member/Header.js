import React from 'react'
import {Button, Card, Col, Row,Space,Spin} from 'antd'
import { MailOutlined,PhoneOutlined,UserOutlined } from '@ant-design/icons'
import style from './Index.module.scss'
import { updateMember } from '../../redux/slices/drawer'
import { useDispatch } from 'react-redux'
import { useQuery } from '@apollo/client'
import {GET_MEMBER_BY_ID} from '../../graphql/Member'

const Header = ({id})=>{
    const dispatch = useDispatch()

const {data,loading} = useQuery(GET_MEMBER_BY_ID,{variables:{id:parseInt(id)}})
const info = data?.getMemberById

    return(
       
           <div className={style.container}>
               <Card className={style.profile_wrapper}>
                   <div style={{display:"flex", gap:10}}>
                       {
                           loading ? 
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}><Spin /></div>:
                       
                        <>
                        <Card className={style.profile_picture}>
                            <UserOutlined className="text-muted" style={{fontSize:"50px"}}/></Card>
                                <div className={style.content}>
                                    <h2>{info?.designation} {info?.firstName} {info?.lastName}</h2>
                                    <p className="text-muted">{info?.maritalStatus}  -{info?.employmentStatus} -{info?.language}</p>
                                    <Space size={15}>
                                        <p className="text-muted"><MailOutlined/> {info?.email}</p>
                                        <p className="text-muted"><PhoneOutlined /> {info?.phone}</p>
                                        <p className="text-muted">DOB: {info?.dateOfBirth}</p>
                                        <Button type="link" onClick={()=>dispatch(updateMember({id:id, open:true}))}>More</Button>
                                    </Space>
                            </div>                        
                        
                    </>
                       }
                       </div>

</Card>
                    
         
           </div>
      
    )
}

export default Header