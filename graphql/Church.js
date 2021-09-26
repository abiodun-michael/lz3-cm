import {gql} from '@apollo/client'


export const GET_ALL_GROUP_BY_ZONE_ID = gql`
  query GetAllGroupByZoneId($zoneId:Int!)  {
        getAllGroupByZoneId(zoneId:$zoneId){
            address
            id
            name
            type
        }
    }
`

export const GET_ALL_CHURCH = gql`
  query GetAllChurch($groupId:Int!)  {
        getAllChurch(input:{groupId:$groupId}){
            address
            id
            name
            type
        }
    }
`

export const GET_CHURCH_BY_ID = gql`
  query GetChurchById($id:Int!)  {
        getChurchById(id:$id){
            address
            id
            name
            type
            latitude
            longitude
            pastor{
                firstName
                lastName
                phone
                designation
            }
        }
    }
`



export const CREATE_CHURCH = gql`
    mutation CreateChurch(
        $name:String!
        $address:String!
        $isGroup:Boolean!
        $groupId:Int!
        $latitude:String
        $longitude:String
        $type:CHURCH_TYPE!
        $zoneId:Int!
    ){
        createChurch(input:{
            name:$name
            address:$address
            isGroup:$isGroup
            latitude:$latitude
            longitude:$longitude
            groupId:$groupId
            type:$type
            zoneId:$zoneId
        }){
            message
            status
            church{
                name
                address
                type
                id
            }
        }
    }
`

export const DELETE_CHURCH = gql`
    mutation DeleteChurch($id:Int!){
        deleteChurch(id:$id){
            message
            status
        }
    }
`

export const UPDATE_CHURCH = gql`
    mutation UpdateChurch(
        $id:Int!
        $latitude:String!
        $longitude:String!
        $name:String!
        $type:CHURCH_TYPE!
        $address:String!
    ){
        updateChurch(input:{
            id:$id
            latitude:$latitude
            longitude:$longitude
            name:$name
            type:$type
            address:$address
        }){
            message
            status
        }
    }
`