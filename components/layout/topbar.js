import React from 'react'
import style from './sidebar.module.scss'
import {Menu,Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';

const Topbar = ({title})=>{
    return(
        <>
        <div className={style.horwrapper}>
            <div className={style.leftnav}>
                <h2>{title}</h2>
            </div>
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