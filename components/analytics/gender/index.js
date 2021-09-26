import React,{useState} from 'react'
import { Card ,Spin} from 'antd'
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/client'
import { GET_GENDER } from '../../../graphql/Analytics'



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

    const {loading} = useQuery(GET_GENDER,{
        onCompleted({getGender}){
            const labels = getGender?.map(({gender})=>gender)
            const series = getGender?.map(({count})=>count)
            setState({labels,series})
        }
    })


    return(
        <Card>
            <h3>Gender</h3>
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