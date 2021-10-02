import {gql} from '@apollo/client'


export const GET_ALL_TICKET_BY_CHURCH = gql`
  {
        getAllTicketByChurch{
            id
            name
            status
            mydeposits
            createdAt
        }
    }
`