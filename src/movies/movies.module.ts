import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { TmdbModule } from 'src/tmdb/tmdb.module';
import { MoviesController } from './movies.controller';

@Module({
  controllers: [MoviesController],
  imports: [TypeOrmModule.forFeature([Movie]), TmdbModule],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
