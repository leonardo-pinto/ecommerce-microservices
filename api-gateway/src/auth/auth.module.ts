import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [AwsModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
