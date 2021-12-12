import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: Int!
    photo: Photo!
    user: User!
    userId: Int!
    payload: String!
    createdAt: String!
    updatedAt: String!
    isMine: Boolean!
  }
`;
