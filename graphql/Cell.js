import {gql} from '@apollo/client'


export const CREATE_CELL = gql`
    mutation CreateCell(
        $name:String!
        $desc:String!
        $leaderId:Int
    ){
        createCell(input:{
            name:$name
            desc:$desc
            leaderId:$leaderId
        }){
            message
            status
            cell{
                name
                id
            }
        }
    }

`

export const UPDATE_CELL = gql`
    mutation UpdateCell(
        $id:Int!
        $name:String!
        $desc:String!
        $leaderId:Int!
    ){
        updateCell(input:{
            id:$id
            name:$name
            desc:$desc
            leaderId:$leaderId
        }){
            message
            status
            cell{
                name
                id
            }
        }
    }

`

export const GET_ALL_CELL = gql`
    {
        getAllCell{
            id
            name
            desc
            leader{
                id
                firstName
                lastName
            }
        }
    }
`

export const GET_CELL_BY_ID = gql`
    query GetCellById($id:Int!){
        getCellById(id:$id){
            id
            name
            desc
            leaderId
        }
    }
`