import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
          JwtModule.register({
            global:true,
            secret:'2136542',
            signOptions:{expiresIn:10}
          }),
          ConfigModule
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
