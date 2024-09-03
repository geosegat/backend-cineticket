import { Showtime } from 'src/showtime/showtime.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Nome da sala, por exemplo, "Sala 1"

  @Column()
  ticketLimit: number; // Número máximo de ingressos disponíveis por sala

  @OneToMany(() => Showtime, (showtime) => showtime.room)
  showtimes: Showtime[];
}
