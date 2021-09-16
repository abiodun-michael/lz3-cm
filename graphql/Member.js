import {gql} from '@apollo/client'


export const GET_ALL_MEMBER = gql`
    {
        getAllMember{
            firstName
            lastName
            phone
            dateOfBirth
            id
            designation
            maritalStatus

        }
    }
`

export const GET_MEMBER_BY_ID = gql`
    query GetMemberById($id:Int!){
        getMemberById(id:$id){
            firstName
            lastName
            phone
            dateOfBirth
            id
            designation
            email
            gender
            maritalStatus
            employmentStatus
            homeAddress
            officeAddress
            language
            baptismStatus
            foundationSchoolStatus

        }
    }
`


export const CREATE_MEMBER = gql`
    mutation CreateMember(
        $firstName:String!
        $lastName:String!
        $email:String
        $phone:String!
        $officeAddress:String
        $homeAddress:String!
        $gender:GENDER_TYPE!
        $designation:DESIGNATION_TYPE!
        $language:String!
        $dateOfBirth:String
        $baptismStatus:Boolean!
        $foundationSchoolStatus:FOUNDATION_STATUS_TYPE!
        $employmentStatus:EMPLOYMENT_STATUS_TYPE!
        $maritalStatus:MARITAL_STATUS_TYPE!
        $profession:String
        $profilePicture:String
        $cellId:Int
    ){
        createMember(input:{
            firstName:$firstName
            lastName:$lastName
            email:$email
            phone:$phone
            officeAddress:$officeAddress
            homeAddress:$homeAddress
            gender:$gender
            designation:$designation
            language:$language
            dateOfBirth:$dateOfBirth
            baptismStatus:$baptismStatus
            maritalStatus:$maritalStatus
            foundationSchoolStatus:$foundationSchoolStatus
            employmentStatus:$employmentStatus
            profession:$profession
            profilePicture:$profilePicture
            cellId:$cellId
        }){
            message
            status
        }
    }
`

export const UPDATE_MEMBER = gql`
    mutation UpdateMember(
        $id:Int!
        $firstName:String!
        $lastName:String!
        $email:String
        $phone:String!
        $officeAddress:String
        $homeAddress:String!
        $gender:GENDER_TYPE!
        $designation:DESIGNATION_TYPE!
        $language:String!
        $dateOfBirth:String!
        $maritalStatus:MARITAL_STATUS_TYPE!
        $baptismStatus:Boolean!
        $foundationSchoolStatus:FOUNDATION_STATUS_TYPE!
        $employmentStatus:EMPLOYMENT_STATUS_TYPE!
        $profession:String
        $profilePicture:String
        $cellId:Int
    ){
        updateMember(input:{
            id:$id
            firstName:$firstName
            lastName:$lastName
            email:$email
            phone:$phone
            officeAddress:$officeAddress
            homeAddress:$homeAddress
            gender:$gender
            maritalStatus:$maritalStatus
            designation:$designation
            language:$language
            dateOfBirth:$dateOfBirth
            baptismStatus:$baptismStatus
            foundationSchoolStatus:$foundationSchoolStatus
            employmentStatus:$employmentStatus
            profession:$profession
            profilePicture:$profilePicture
            cellId:$cellId
        }){
            message
            status
        }
    }
`