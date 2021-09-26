import {gql} from '@apollo/client'


export const GET_ALL_MEMBER_BY_CHURCH_ID = gql`
    query GetAllMemberByChurchId(
        $id:Int!
    ){
        getAllMemberByChurchId(id:$id){
            firstName
            lastName
            phone
            email
            gender
            maritalStatus
            designation
            id
        }
    }
`

export const CREATE_MEMBER = gql`
    mutation CreateMember(
       $churchId:Int
       $firstName:String! 
       $lastName:String! 
       $email:String 
       $phone:String! 
       $homeAddress: String!
       $officeAddress: String 
       $language: String!
       $dateOfBirth:String
       $designation: DESIGNATION_TYPE!
       $baptismStatus: Boolean!
       $foundationSchoolStatus: FOUNDATION_STATUS_TYPE!
       $employmentStatus:EMPLOYMENT_STATUS_TYPE! 
       $maritalStatus:MARITAL_STATUS_TYPE! 
       $gender:GENDER_TYPE! 
    ){
        createMember(input:{
            churchId:$churchId
            firstName:$firstName
            lastName:$lastName 
            email:$email 
            phone:$phone
            homeAddress: $homeAddress 
            officeAddress: $officeAddress 
            language: $language
            dateOfBirth:$dateOfBirth 
            designation: $designation
            baptismStatus:$baptismStatus
            foundationSchoolStatus:$foundationSchoolStatus
            employmentStatus:$employmentStatus 
            maritalStatus:$maritalStatus 
            gender:$gender
        }){
            message
            status
            member{
                firstName
                lastName
                email
                id
                phone
            }
        }
    }
`

export const CREATE_ADMIN = gql`
    mutation CreateAdmin(
        $name:String!
        $email:String!
        $phone:String!
        $churchId:Int
        $permission:PermissionInput!
    ){
        createAdmin(input:{
            churchId:$churchId
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

export const GET_ALL_ADMIN_BY_CHURCH_ID = gql`
    query GetAllAdminByChurchId($id:Int!){
        getAllAdminByChurchId(id:$id){
            email
            id
            name
            code
            permission {
                role
                service
            }
            phone
            status
        }
    }
`

export const REVOKE_ADMIN = gql`
    mutation RevokeAccount($id:Int!){
        revokeAccount(id:$id){
            message
            status
        }
    }
`

export const DELETE_ADMIN = gql`
    mutation DeleteAdmin($id:Int!){
        deleteAdmin(id:$id){
            message
            status
        }
    }
`

export const RESET_PASSWORD = gql`
    mutation ResetPassword($id:Int!){
        resetPassword(id:$id){
            message
            status
        }
    }
`

export const ASSIGN_PASTOR = gql`
    mutation AssignPastor(
        $id:Int!
        $pastorId:Int!
    ){
        assignPastor(input:{
            id:$id
            pastorId:$pastorId
        }){
            message
            status
        }
    }
`