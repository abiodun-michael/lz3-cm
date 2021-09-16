import React from 'react'
import { Layout as AntLayout} from 'antd'
import Sidebar from './sidebar'
import Topbar from './topbar'
import Logo from '../logo'
import style from './sidebar.module.scss'
import CreateMemberForm from '../member/Create-Member-Form'
import UpdateMemberForm from '../member/Update-Member-Form'
import CreateCellForm from '../cell/Create-Cell-Form'
import SubmitFdtsReport from '../fdts/Submit-Report-Form'



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
                <Footer>Send us a message</Footer>
            </AntLayout>
            <CreateMemberForm/>
            <UpdateMemberForm/>
            <CreateCellForm/>
            <SubmitFdtsReport/>
        </AntLayout>
    )
}

export default Layout