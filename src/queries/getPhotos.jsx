import { gql } from "@apollo/client";

const GET_PHOTO = gql`
  query Photos($characterId: ID!) {
    character(id: $characterId) {
      image
      name
    }
  }
`;

export default GET_PHOTO;
