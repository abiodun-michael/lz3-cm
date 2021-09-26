import {gql} from '@apollo/client'

export const GET_MEMBER_COUNT = gql`
    {
        getMemberCount
    }
`

export const GET_PASTOR_COUNT = gql`
    {
        getPastorCount
    }
`
export const GET_NOT_IN_CELL_COUNT = gql`
    {
        getNotInCellCount
    }
`
export const GET_GENDER = gql`
    {
        getGender{
            count
            gender
        }
    }
`
export const GET_MARITAL_STATUS = gql`
    {
        getMaritalStatus{
            count
            maritalStatus
        }
    }
`

export const GET_CHURCH_COUNT = gql`
    {
        getChurchCount
    }
`