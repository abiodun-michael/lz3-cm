import React,{useState} from 'react'
import { Card,Spin } from 'antd'
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/client'
import { GET_MARITAL_STATUS } from '../../../graphql/Analytics'


const Chart = dynamic(
    () => import("react-apexcharts"),
    { ssr: false }
  )

const Index = ()=>{
    const [state,setState] = useState({
        labels:[],
        series:[]
    })

    const chartConfig ={
        options:{
            labels:state.labels
        },
        series:state.series,
        
    }

    const {loading} = useQuery(GET_MARITAL_STATUS,{
        onCompleted({getMaritalStatus}){
            const labels = getMaritalStatus?.map(({maritalStatus})=>maritalStatus)
            const series = getMaritalStatus?.map(({count})=>count)
            setState({labels,series})
        }
    })


    return(
        <Card>
            <h3>Marital Status</h3>
            {
                loading ?
            
            <div style={{height:200, display:"flex", alignItems:"center", justifyContent:'center'}}>
                <Spin />
            </div>:
            <Chart options={chartConfig.options} 
                series={chartConfig.series} 
                type="pie" width="380" />
            }
        </Card>
    )
}

export default Index