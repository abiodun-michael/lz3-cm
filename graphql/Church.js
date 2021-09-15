import {gql} from '@apollo/client'


export const GET_CHURCH_PROFILE = gql`
    {
        getChurchProfile{
            id
            name
            longitude
            latitude
            address
            type
        }
    }

`

export const UPDATE_CHURCH_PROFILE = gql`
    mutation UpdateChurchProfile(
        $address:String!
        $latitude:String!
        $longitude:String!
        $name:String!
        $type:CHURCH_TYPE!
    ){
        updateChurchProfile(input:{
            address:$address
            latitude:$latitude
            longitude:$longitude
            name:$name
            type:$type
        }){
            message
            status
        }
    }
`
