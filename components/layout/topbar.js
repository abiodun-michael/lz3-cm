import React from 'react'
import style from './sidebar.module.scss'
import {Menu,Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react'
import Logo from '../logo';

const Topbar = ({title,toggleCollapse=()=>{}, collapse})=>{
    return(
        <>
        <div className={style.horwrapper}>
            <div className={style.leftnav}>
               
            </div>
            <Logo height="auto" paddingTop={0} paddingLeft={10}/>
                   
            <Menu mode="horizontal" className={style.hor}>
                <Menu.Item key={11}>
                    <Avatar size="large"><UserOutlined /></Avatar>
                </Menu.Item>
            </Menu>
        </div>
        
        
        </>
    )
}

export default Topbar