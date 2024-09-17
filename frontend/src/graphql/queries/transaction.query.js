import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      amount
      category
      date
      description
      location
      paymentType
      userId
    }
  }
`;
