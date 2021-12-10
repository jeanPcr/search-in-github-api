import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosError, AxiosResponse } from 'axios';
import { Interface } from 'readline';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Repository } from 'typeorm';
import { UsersDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { login: username } });
  }

  async storeInDB(user_DTO: UsersDTO) {
    const user = this.userRepository.create(user_DTO);
    await this.userRepository.save(user);
    return user;
  }

  async APIfetchUser(username: string): Promise<Observable<any>> {
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    };

    return this.httpService
      .get(`https://api.github.com/users/${username}`, requestConfig)
      .pipe(
        map((res) => {
          if (res.data.login) {
            this.storeInDB(res.data);
          }
          return res.data;
        }),
        catchError((e) => {
          return of({
            status: e.response.status,
            message: e.response.statusText,
          });
        }),
      );
  }
}
