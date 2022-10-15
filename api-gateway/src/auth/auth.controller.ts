import { Body, Controller, Post } from '@nestjs/common';
import { AwsCognitoService } from 'src/aws/aws-cognito.service';
import { AuthLoginDto } from './dtos/auth-login.dto';
import { AuthSignupDto } from './dtos/auth-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private awsCognitoService: AwsCognitoService) {}

  @Post('signup')
  async signup(@Body() authSignupDto: AuthSignupDto) {
    return this.awsCognitoService.signup(authSignupDto);
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.awsCognitoService.login(authLoginDto);
  }
}
