import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findOne(id: number): Promise<Room> {
    return this.roomRepository.findOneBy({ id });
  }

  async create(room: Partial<Room>): Promise<Room> {
    const newRoom = this.roomRepository.create(room);
    return this.roomRepository.save(newRoom);
  }

  async update(id: number, room: Partial<Room>): Promise<Room> {
    await this.roomRepository.update(id, room);
    return this.roomRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
