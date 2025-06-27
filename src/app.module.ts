import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

import { StudentsModule } from './students/students.module';
import { Student } from './students/entities/student.entity';


@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      entities: [User, Student],
      synchronize: true,
    }),
    
    StudentsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
