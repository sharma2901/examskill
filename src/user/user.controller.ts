import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findAll() {
    return 'Hello Users';
  }

  @Post()
  create(@Body() newUser) {
    console.log('newUser at controller', newUser);
    const res = this.userService.create(newUser);
    console.log('res', res);
    return res;
  }
}
