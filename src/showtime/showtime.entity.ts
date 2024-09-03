import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from 'src/movies/movie.entity';
import { Room } from 'src/room/room.entity';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  movie: Movie;

  @ManyToOne(() => Room, (room) => room.showtimes)
  room: Room;
}
