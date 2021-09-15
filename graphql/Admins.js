import {gql} from '@apollo/client'


export const GET_ALL_ADMIN = gql`
    {
        getAllAdmin{
            name
            email
            phone
            status
            id
        }
    }
`

export const GET_ADMIN_BY_ID = gql`
    query GetAdminById($id:Int!){
        getAdminById(id:$id){
            name
            email
            phone
            status
            id
        }
    }
`

export const LOGIN = gql`
    mutation Login(
        $email:String!
        $password:String!
    ){
        login(input:{
            email:$email
            password:$password
        }){
            message
            status
            sessionId
        }
    }
`

export const CHANGE_PASSWORD = gql`
    mutation(
        $email:String!
        $password:String!
    ){
        changePassword(input:{
            email:$email
            password:$password
        }){
            message
            status
        }
    }
`

export const ACTIVATE_ACCOUNT = gql`
    mutation ActivateAccount($email:String!
    $code:String!){
        activateAccount(input:{
            email:$email
            code:$code
        }){
            message
            status
        }
    }
`

export const DELETE_ALL = gql`
    mutation{
    deleteAll {
        message
    }
    }
`

export const INVITE_ADMIN = gql`
    mutation InviteAdmin(
        $name:String!
        $email:String!
        $phone:String!
        $permission:PermissionInput!
    ){
        inviteAdmin(input:{
            name:$name
            email:$email
            phone:$phone
            permission:$permission
        }){
            message
            status
        }
    }
`

export const UPDATE_ADMIN = gql`
    mutation UpdateAdmin(
        $id:Int!
        $name:String!
        $phone:String!
        $email:String!
        $permission:PermissionInput!
    ){
        updateAdmin(input:{
            name:$name
            email:$email
            phone:$phone
            id:$id
            permission:$permission
        }){
            message
            status
        }
    }
`