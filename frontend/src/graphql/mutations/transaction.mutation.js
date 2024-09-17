import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation create_transaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      _id
      userId
      category
      date
      amount
    }
  }
`;
