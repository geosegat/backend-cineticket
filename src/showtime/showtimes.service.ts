import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Showtime } from './showtime.entity';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private showtimesRepository: Repository<Showtime>,
  ) {}

  async createShowtime(
    time: string,
    movieId: number,
    roomId: number,
  ): Promise<Showtime> {
    const showtime = this.showtimesRepository.create({
      time,
      movie: { id: movieId },
      room: { id: roomId },
    });
    return this.showtimesRepository.save(showtime);
  }

  async getAllShowtimes(): Promise<Showtime[]> {
    return this.showtimesRepository.find({ relations: ['movie', 'room'] });
  }

  async getShowtimeById(id: number): Promise<Showtime> {
    const showtime = await this.showtimesRepository.findOne({
      where: { id },
      relations: ['movie', 'room'],
    });

    if (!showtime) {
      throw new NotFoundException(`Showtime with ID ${id} not found`);
    }

    return showtime;
  }

  async removeShowtime(id: number): Promise<void> {
    const showtime = await this.getShowtimeById(id);

    if (!showtime) {
      throw new NotFoundException(`Showtime with ID ${id} not found`);
    }

    await this.showtimesRepository.delete(id);
  }
}
