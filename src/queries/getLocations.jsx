import { gql } from "@apollo/client";

export const NAMES_FIELD = gql`
  fragment Names on Character {
    name
  }
`;

const GET_MORTYS = gql`
  query Query {
    characters {
      info {
        count
      }
      results {
        ...Names
      }
    }
  }
  ${NAMES_FIELD}
`;

export default GET_MORTYS;
