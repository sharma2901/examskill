import { Body, Controller, Get, Post, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() newUser) {
    return this.userService.create(newUser);
  }

  @Patch(':id')
  update(@Body() newUser, @Param('id') id: string) {
    return this.userService.update(id, newUser);
  }
}
