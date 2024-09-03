import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return this.roomsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Room> {
    return this.roomsService.findOne(id);
  }

  @Post()
  async create(@Body() room: Partial<Room>): Promise<Room> {
    return this.roomsService.create(room);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() room: Partial<Room>,
  ): Promise<Room> {
    return this.roomsService.update(id, room);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.roomsService.remove(id);
  }
}
