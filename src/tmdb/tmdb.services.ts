import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TmdbService {
  private readonly token =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzI5ZDZkOTE4YjEwYjIxMzE0ZDcyNzk5ZDc1ZWVmYyIsIm5iZiI6MTcyNTI5NjU0OS4xMTEyOSwic3ViIjoiNjZiYjhjNmRiMGZhZGEzODUwYzMzMTA4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.99gBjhA30ss9QoaA2eV-K4k2EdaofNY1i8rwPXUA8Xs';
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  constructor(private readonly httpService: HttpService) {}

  async fetchMovies(): Promise<any> {
    const url = `${this.baseUrl}/discover/movie`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          sort_by: 'popularity.desc',
        },
        headers: {
          accept: 'application/json',
          Authorization: this.token,
        },
      }),
    );
    return response.data.results;
  }
}
