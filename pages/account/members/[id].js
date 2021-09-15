import React,{useEffect} from 'react'
import Layout from '../../../components/layout'
import Router from 'next/router'
import Header from '../../../components/member/Header'
import Activities from '../../../components/member/Activities'


const Members = ({id})=>{


    useEffect(()=>{
      if(!id){
        Router.replace("/account/members")
      }
    },[])

    return(
       
        <Layout>
           <Header id={id}/>
           <Activities />
           

        </Layout>
      
    )
}

export async function getServerSideProps({query}) {

const id = query?.id

  return {
    props: {id}
  }
}

export default Members