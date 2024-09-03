import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { TmdbService } from 'src/tmdb/tmdb.services';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private readonly tmdbService: TmdbService,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOneBy({ id });
  }

  async create(movie: Partial<Movie>): Promise<Movie> {
    const newMovie = this.moviesRepository.create(movie);
    return this.moviesRepository.save(newMovie);
  }

  async update(id: number, movie: Partial<Movie>): Promise<Movie> {
    await this.moviesRepository.update(id, movie);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }

  async populateMovies(): Promise<void> {
    const movies = await this.tmdbService.fetchMovies();

    for (const movie of movies) {
      let existingMovie = await this.moviesRepository.findOneBy({
        idMovie: movie.id.toString(), // Usando 'idMovie' em vez de 'tmdbId'
      });

      if (!existingMovie) {
        // Criar um novo filme com base nas propriedades disponíveis na resposta da API
        existingMovie = this.moviesRepository.create({
          idMovie: movie.id.toString(),
          title: movie.title,
          description: movie.overview,
          genre: movie.genre_ids.join(','), // Usando 'genre' conforme definido na entidade
          ageRating: '', // Defina isso conforme necessário ou remova se não precisar
        });
      } else {
        // Atualizar o filme existente
        existingMovie.title = movie.title;
        existingMovie.description = movie.overview;
        existingMovie.genre = movie.genre_ids.join(',');
        existingMovie.ageRating = ''; // Atualize conforme necessário
      }

      await this.moviesRepository.save(existingMovie);
    }
  }
}
