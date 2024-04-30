import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
       host: `${process.env.PGSQL_HOST || 'localhost'}`,
      port: parseFloat(`${process.env.PGSQL_PORT || '5432'}`),
      username: `${process.env.PGSQL_USERNAME || 'postgres'}`,
      password: `${process.env.PGSQL_PASSWORD || 'postgres'}`,
      database: `${process.env.PGSQL_DATABASE || 'postgres'}`,
      autoLoadEntities: true, 
      synchronize: true,
    }),
    CommentsModule,
    UsersModule,
    VideosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}