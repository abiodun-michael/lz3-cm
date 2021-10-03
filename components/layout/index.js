import React,{useState} from 'react'
import { Layout as AntLayout} from 'antd'
import Sidebar from './sidebar'
import Topbar from './topbar'
import Logo from '../logo'
import FeatherIcon from 'feather-icons-react'
import style from './sidebar.module.scss'
import CreateMemberForm from '../member/Create-Member-Form'
import UpdateMemberForm from '../member/Update-Member-Form'
import SubmitFdtsReport from '../fdts/Submit-Report-Form'



const Layout = ({title,children})=>{

    const [collapse, setCollapse] = useState("menu")

   

    const {Sider,Header,Content,Footer} = AntLayout

    return(
        <AntLayout style={{height:"100%"}}>
            <Sider width={260}
            className={style.sider} 
            breakpoint="xs"
            collapsedWidth={0}
            onCollapse={(collapse,type)=>{
                if(collapse){
                    setCollapse("menu")
                }else{
                    setCollapse("x")
                }
            }}
            trigger={<FeatherIcon icon={collapse}/>}
           >
                <Logo />
                <Sidebar />
            </Sider>
            <AntLayout>
            <Header
            className={style.header} 
                    style={{backgroundColor:"white",padding:'0 15px',
                    position: "sticky",top:0,bottom:0,zIndex:22}}>
                        <Topbar 
                            title={title} 
                            toggleCollapse={()=>setCollapse(!collapse)} 
                            collapse={collapse}/></Header>
                <Content className={style.main}>{children}</Content>
                <Footer style={{position:"absolute", bottom:0,left:0,right:0}}>Christ Embassy Lagos Zone 3 - Church Manager v1</Footer>
            </AntLayout>
            <CreateMemberForm/>
            <UpdateMemberForm/>
            <SubmitFdtsReport/>
        </AntLayout>
    )
}

export default Layout