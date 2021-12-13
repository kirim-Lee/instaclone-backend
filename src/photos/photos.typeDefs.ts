import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Int!
    user: User!
    userId: Int!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createdAt: String!
    updatedAt: String!
    totalLikes: Int!
    totalComments: Int!
    isMine: Boolean!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    createdAt: String!
    updatedAt: String!
    totalPhotos: Int!
  }

  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
