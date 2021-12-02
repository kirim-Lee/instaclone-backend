import { gql } from 'apollo-server';

export default gql`
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }

  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int): Movie
    updateMovie(id: Int, year: Int!): Movie
  }

  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createAt: String!
    updateAt: String!
  }
`;
