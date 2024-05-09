import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, User } from './entities/users.entities';
import { UsersController } from './controllers/users.controller';
import { userService } from './service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  controllers: [UsersController],
  providers: [userService],
  exports: [userService],
})
export class UsersModule {}
