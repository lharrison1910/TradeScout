import { UseGuards, Controller, Get } from '@nestjs/common';
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
}
