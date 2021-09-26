import React from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(
    () => import("react-apexcharts"),
    { ssr: false }
  )


import {Card} from 'antd'

const Growth = ()=>{

    const state = {
        options: {
          plotOptions: {
            bar: {
               borderRadius:10,
            }
          },

          chart: {
            height: 350,
            type: 'line',
            stacked: false,
            toolbar:false
          },
          theme:{
            mode:"light",
            palette:"palette1"
          },
          labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"],
         stroke:{
           curve:"smooth"
         },
         noData:{
           text:"No data to display",
           align:"center",
           verticalAlign:"middle"
         }
        },
        series:[
          {
            name:"Membership",
            type:"column",
            data:[100,120,300,450,500,510,530]
          },
          {
            name:"Trends",
            type:"line",
            data:[0,20,180,150,50,10,20],
          }
        ],
       
      };
    


    return(
        <Card>
            <h3>Monthly Growth</h3>
        <Chart
              options={state.options}
              series={state.series}
              width="100%"
            />
        </Card>
        
    )
}

export default Growth