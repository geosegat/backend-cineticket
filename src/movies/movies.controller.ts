import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post()
  async create(@Body() movie: Partial<Movie>): Promise<Movie> {
    return this.moviesService.create(movie);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() movie: Partial<Movie>,
  ): Promise<Movie> {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.moviesService.remove(id);
  }
}
