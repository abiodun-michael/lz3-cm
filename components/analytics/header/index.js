import React from 'react'
import {Card,Statistic} from 'antd'
import style from './Index.module.scss'
import FeatherIcon from 'feather-icons-react'
import { useQuery } from '@apollo/client'
import { GET_MEMBER_COUNT, GET_PASTOR_COUNT,GET_NOT_IN_CELL_COUNT,GET_CHURCH_COUNT } from '../../../graphql/Analytics'

const Header = ()=>{

    

    const {data:notInCell} = useQuery(GET_NOT_IN_CELL_COUNT)
    const {data:memberCount,loading} = useQuery(GET_MEMBER_COUNT)
    const {data:pastorCount} = useQuery(GET_PASTOR_COUNT)
    const {data:churchCount} = useQuery(GET_CHURCH_COUNT)

    const pastorsPercent = memberCount?.getMemberCount && pastorCount?.getPastorCount ? (100*pastorCount?.getPastorCount)/memberCount?.getMemberCount:0
    const notInCellPercent = memberCount?.getMemberCount && notInCell?.getNotInCellCount ? (100*notInCell?.getNotInCellCount)/memberCount?.getMemberCount:0

    return(
        <Card style={{padding:"10px 20px"}}>
            <h3>2021 Statistics</h3>
            <div className={style.card}>
                <StatItem icon="archive" 
                    bgColor="rgba(115,103,240,.12)"
                    color="#7367f0"
                    title="Churches" data={churchCount?.getChurchCount}/>
                <StatItem  icon="users" 
                    bgColor="rgba(0,207,232,.12)"
                    color="#00cfe8"
                    title="Members" data={memberCount?.getMemberCount}/>
                <StatItem 
                    bgColor="rgba(234,84,85,.12)"
                    color="#ea5455"
                    icon="bar-chart" title="No Cell" data={Math.round(notInCellPercent * 100) / 100 +'%'}/>
                <StatItem 
                    bgColor="rgba(40,199,111,.12)"
                    color="#28c76f"
                    icon="trending-up" title="Partners" 
                    data="NA"/>
                <StatItem 
                    bgColor="rgba(40,199,111,.12)"
                    color="#28c76f"
                    icon="user" title="Pastor" 
                    data={Math.round(pastorsPercent * 100) / 100 +'%'}/>
            </div>
        </Card>
    )
}

export default Header


const StatItem = ({icon,data,title, bgColor,color})=>{

    return(
        <div className={style.container}>
         <div className={style.icon_wrapper} style={{backgroundColor:bgColor, color:color}}>
            <FeatherIcon icon={icon}/>
         </div>
            <div className={style.content}>
            <Statistic title={title} value={data} />
            </div>
        </div>
    )
}