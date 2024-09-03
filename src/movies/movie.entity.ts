import { Showtime } from 'src/showtime/showtime.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column({ name: 'idMovie', type: 'varchar', length: 50, nullable: true })
  idMovie: string;

  @Column({ name: 'ageRating', type: 'varchar', length: 10, nullable: true })
  ageRating: string;

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[];
}
