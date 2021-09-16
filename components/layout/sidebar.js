import React from 'react'
import {Menu} from 'antd'
import style from './sidebar.module.scss'
import FeatherIcon from 'feather-icons-react'
import Router,{useRouter}  from 'next/router'
import Link from 'next/link'


const {Item,ItemGroup } = Menu

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
        <div style={{height:"80%",display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
        <Menu mode="vertical" theme="light"
        className={style.menu}>
      
            <MenuItem
                key={1}
                Icon={<FeatherIcon size={18} icon="home" />}
                title="Dashboard"
                target='/account'/>

                
            <MenuItem
                key={2}
                Icon={<FeatherIcon size={18} icon="users" />}
                title="Members"
                target='/account/members'/>

            <MenuItem
                key={3}
                Icon={<FeatherIcon size={18} icon="box" />}
                title="Cell"
                target='/account/cells'/>

            
      
           
        </Menu>
        <Menu mode="vertical" theme="light"
        className={style.menu}>
            <MenuItem
                key={4}
                Icon={<FeatherIcon size={18} icon="tool" />}
                title="Configurations"
                target='/account/settings'/>
        </Menu>
    </div>
    )
}

export default Sidebar