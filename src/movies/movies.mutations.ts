import client from '../client';

interface IMovie {
  id: number;
  title: string;
  year: number;
  genre?: string;
}

export default {
  Mutation: {
    createMovie: (_: never, { title, year, genre }: IMovie) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMovie: (_: never, { id }: IMovie) =>
      client.movie.delete({ where: { id } }),
    updateMovie: (_: never, { id, year }: IMovie) => {
      return client.movie.update({ where: { id }, data: { year } });
    },
  },
};
