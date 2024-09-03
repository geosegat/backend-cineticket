import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { Showtime } from './showtime.entity';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Post()
  async create(
    @Body() body: { time: string; movieId: number; roomId: number },
  ): Promise<Showtime> {
    const { time, movieId, roomId } = body;
    return this.showtimesService.createShowtime(time, movieId, roomId);
  }

  @Get()
  async findAll(): Promise<Showtime[]> {
    return this.showtimesService.getAllShowtimes();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Showtime> {
    return this.showtimesService.getShowtimeById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.showtimesService.removeShowtime(id);
  }
}
