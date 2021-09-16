import React,{useState} from 'react'
import Layout from '../../components/layout'
import Access from '../../components/settings/Access'
import CreateAdminForm from '../../components/settings/CreateAdminForm'
import EditAdminForm from '../../components/settings/EditAdminForm'
import Profile from '../../components/settings/Profile'

import {Tabs, Card} from 'antd'

const {TabPane} = Tabs

const Index = ()=>{

    const [drawer, setDrawer] = useState({
        add:false,
        edit:false
    })

    const [selectedId, setSelectedId] = useState(0)


    return(
        <Layout>
            <Card>
            <Tabs defaultActiveKey="1">
            <TabPane tab="Manager" key="1" style={{paddingTop:20}}>
                <Access onItemClick={(e)=>{
                    setSelectedId(e)
                    setDrawer({...drawer, edit:true})
                }} onClick={()=>setDrawer({...drawer, add:true})}/>
            </TabPane>
            <TabPane tab="Profile" key="2">
           <Profile />
            </TabPane>
            <TabPane tab="Configurations" key="3">
            Content of Tab Pane 3
            </TabPane>
        </Tabs>
            </Card>
           
           <CreateAdminForm onClose={()=>setDrawer({...drawer, add:false})} open={drawer.add}/>
           <EditAdminForm id={selectedId} onClose={()=>setDrawer({...drawer, edit:false})} open={drawer.edit}/>
        </Layout>
    )
}

export default Index