import {gql} from '@apollo/client'

export const CREATE_GIVING = gql`
    mutation CreateGiving(
        $amount:Float!
        $ticketId:Int!
    ){
        createGiving(input:{
            amount:$amount
            ticketId:$ticketId
        }){
            message
            status
            giving{
                amount
                approvedBy
                createdBy{
                name
                id
            }
                id
                status
            }
        }
    }
`

export const GET_ALL_GIVING_BY_CHURCH = gql`
    query GetAllGivingByChurch($ticketId:Int!){
        getAllGivingByChurch(ticketId:$ticketId){
            amount
            createdAt
            createdBy{
                name
                id
            }
            id
            status
        }
    }
`