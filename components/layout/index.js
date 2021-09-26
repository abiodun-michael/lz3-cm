import React from 'react'
import { Layout as AntLayout} from 'antd'
import Sidebar from './sidebar'
import Topbar from './topbar'
import Logo from '../logo'
import style from './sidebar.module.scss'




const Layout = ({title,children})=>{

   

    const {Sider,Header,Content,Footer} = AntLayout
    return(
        <AntLayout style={{height:"100%"}}>
            <Sider width={260}
            className={style.sider} 
            breakpoint="lg">
                <Logo />
                <Sidebar />
            </Sider>
            <AntLayout>
            <Header
            className={style.header} 
                    style={{backgroundColor:"white",padding:'0 15px',
                    position: "sticky",top:0,zIndex:22}}>
                        <Topbar title={title}/></Header>
                <Content className={style.main}>{children}</Content>
                <Footer>Christ Embassy Lagos Zone 3 - Church Manager v1</Footer>
            </AntLayout>
        </AntLayout>
    )
}

export default Layout