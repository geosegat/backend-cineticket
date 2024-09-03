import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './room/rooms.module';
import { ShowtimesModule } from './showtime/showtimes.module';
import { TmdbModule } from './tmdb/tmdb.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'cineticket',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MoviesModule,
    RoomsModule,
    ShowtimesModule,
    TmdbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
