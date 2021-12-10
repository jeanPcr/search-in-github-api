import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':username')
  async getByUsername(@Res() response, @Param('username') username: string) {
    try {
      const user = await this.userService.getUserByUsername(username);
      if (user) {
        return response.status(HttpStatus.OK).json(user);
      }

      this.userService
        .APIfetchUser(username)
        .then((res) => {
          res.subscribe(
            (user) => {
              if (!user.login) {
                return response.status(user.status).json(user);
              } else {
                return response.status(HttpStatus.OK).json(user);
              }
            },
            (error) => {
              console.log(error);
            },
          );
        })
        .catch((error) => {
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
        });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}
