import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SignInDto, SignInSchema } from './dto/sign-in.dto';
import { ZodValidationPipe } from '../shared/pipe/zod-validation.pipe';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { IUser } from 'src/users/entities/user.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UsePipes(new ZodValidationPipe({ body: SignInSchema }))
  @Post('login')
  async signIn(@Body() body: SignInDto) {
    const user = await this.authService.signIn(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async user(@CurrentUser() user: IUser) {
    const currentUser = { ...user };
    delete currentUser.password;
    return currentUser;
  }
}
