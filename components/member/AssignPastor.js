import { Button,Modal,Form,Select,message } from 'antd'
import React,{useState} from 'react'
import style from './index.module.scss'
import {ASSIGN_PASTOR,GET_ALL_MEMBER_BY_CHURCH_ID} from '../../graphql/Member'
import {useQuery, useMutation} from '@apollo/client'

const {Item} = Form

const Index = ({id,pastor={},refetch})=>{
    const [modal, setModal] = useState(false)

    const {data,loading} = useQuery(GET_ALL_MEMBER_BY_CHURCH_ID,{variables:{id:parseInt(id)}})
    const members = data?.getAllMemberByChurchId?.map(({designation,firstName,lastName,id})=>({label:designation+' '+firstName+' '+lastName, value:id}))

    const [assignPastor,{loading:assigning}] = useMutation(ASSIGN_PASTOR,{
        onCompleted({assignPastor}){
            if(assignPastor.status){
                refetch()
                message.success(assignPastor.message)
                setModal(false)
            }else{
                message.error(assignPastor.message)
            }
        }
    })

    return(
        <>
        <div className={style.section}>
            <h3>Assign Pastor</h3>
            <p className="text-muted">This function allows you assign any of the members you added to this church as the Pastor in charge. You can chage anytime</p>
        
            <div className={style.action}>
                <p>{pastor?.designation+' '+pastor?.firstName+' '+pastor.lastName}<br />
                <span className="text-muted">{pastor?.phone}</span></p>
                <Button type="primary" onClick={()=>setModal(true)}>Change</Button>
            </div>
        </div>

        <Modal title="Change Pastor" width={500} visible={modal} footer={null} onCancel={()=>setModal(false)}>
            <Form layout="vertical" requiredMark={false} onFinish={(e)=>assignPastor({variables:{pastorId:e.pastor,id:parseInt(id)}})}>
                <Item name="pastor" label="Pastor / Coordinator" rules={[{message:"You must select a pastor", required:true}]}>
                    <Select loading={loading}
                        options={members}
                        placeholder="Select an option"/>
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" loading={assigning}>Save</Button>
                </Item>
            </Form>
        </Modal>

        </>
    )
}

export default Index