import { gql } from "@apollo/client";

const NAMES_FIELD = gql`
  fragment Names on Character {
    name
    id
  }
`;

const GET_MORTYS = gql`
  query Mortys {
    characters(page: 2, filter: { name: "Morty" }) {
      info {
        count
      }
      results {
        ...Names
      }
    }
    location(id: 1) {
      id
    }
  }
  ${NAMES_FIELD}
`;

export default GET_MORTYS;
