import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, userEntity } from './entities/users.entities';
import { userService } from './service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: userEntity.name, schema: userSchema }]),
  ],
  providers: [userService],
  exports: [userService, MongooseModule],
})
export class UsersModule {}