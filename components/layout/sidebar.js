import React from 'react'
import {Menu} from 'antd'
import style from './sidebar.module.scss'
import { UilCreateDashboard,UilStore,UilSlidersV,UilUser,UilComment } from '@iconscout/react-unicons'
import Router,{useRouter}  from 'next/router'
import Link from 'next/link'
import {AccountBookOutlined,WalletOutlined,AppstoreOutlined,ProfileOutlined} from '@ant-design/icons'


const {Item} = Menu

const MenuItem = ({Icon=()=>{},title, target="#",...rest})=>{
const {pathname} = useRouter()

const activeStyle ={
    background: "linear-gradient(118deg,#7367f0,rgba(115,103,240,.7))",
    boxShadow: "0 0 10px 1px rgb(115 103 240 / 70%)",
    borderRadius: 4,
    color:"white"
}

    const active = pathname == target

    return(
        <Item className={style.item} {...rest} style={active ? activeStyle:{}} icon={Icon}><Link href={target}><a style={{color: active ? 'white':'inherit'}}>{title}</a></Link></Item>
    )
}



const Sidebar = ()=>{
    return(
        <>
        <Menu mode="vertical" theme="light"
        className={style.menu}>
            <MenuItem
                key={1}
                Icon={<AppstoreOutlined height={20} width={20}/>}
                title="Dashboard"
                target='/account'/>

                
            <MenuItem
                key={2}
                Icon={<UilUser height={20} width={20}/>}
                title="Members"
                target='/account/members'/>

            <MenuItem
                key={4}
                Icon={<UilSlidersV height={20} width={20}/>}
                title="Settings"
                target='/account/settings'/>
        </Menu>
        </>
    )
}

export default Sidebar