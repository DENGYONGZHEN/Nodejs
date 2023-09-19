import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Body,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JWTGuard } from '../auth/guard';
import { EditUserDTO } from './dto';
import { UserService } from './user.service';

@UseGuards(JWTGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    //guard strategy 的validate方法返回的值会append到request上
    return user;
  }

  @Patch()
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDTO,
  ) {
    return this.userService.editUser(userId, dto);
  }
}
