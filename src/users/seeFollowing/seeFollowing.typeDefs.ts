import { gql } from 'apollo-server-express';

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    cursor: Int
  }

  type Query {
    seeFollowing(username: String!, cursor: Int): SeeFollowingResult!
  }
`;
