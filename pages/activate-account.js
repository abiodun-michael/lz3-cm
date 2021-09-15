import React from 'react'
import ChangePasswordForm from '../components/auth/activate'

const Index = ({code,email})=>{

    return(
        <ChangePasswordForm email={email} code={code}/>
    )
}

export async function getServerSideProps({query}) {
    return {
      props: query, // will be passed to the page component as props
    }
  }
export default Index
