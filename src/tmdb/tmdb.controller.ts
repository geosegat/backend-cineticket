import { Controller, Post } from '@nestjs/common';
import { MoviesService } from '../movies/movies.service';
import { TmdbService } from './tmdb.services';

@Controller('tmdb')
export class TmdbController {
  constructor(
    private readonly tmdbService: TmdbService,
    private readonly moviesService: MoviesService,
  ) {}

  @Post('import')
  async importMovies() {
    const movies = await this.tmdbService.fetchMovies();
    for (const movie of movies) {
      await this.moviesService.create({
        title: movie.title,
        description: movie.overview,
        genre: movie.genre_ids.join(', '),
        idMovie: movie.id.toString(),
        ageRating: movie.adult ? '18+' : 'PG-13',
      });
    }
    return { message: 'Filmes importados com sucesso!' };
  }
}
