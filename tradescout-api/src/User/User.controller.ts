import { UseGuards, Controller, Get, Body, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../decorator/currentUser.decorator';
import { UserService } from './User.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUser(@CurrentUser() user) {
    return await this.userService.getUser(user);
  }

  @Put('/password')
  async updatePassword(@CurrentUser() currentUser, @Body() body) {
    const { newPassword } = JSON.parse(body);

    return await this.userService.updatePassword(currentUser, newPassword);
  }

  @Put()
  async updateUser(@CurrentUser() currentUser, @Body() body) {
    return await this.userService.updateAccountDetails(currentUser, body);
  }
}
