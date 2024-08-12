import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'db/data_source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';




@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UserModule, AuthModule,ConfigModule.forRoot(), PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
