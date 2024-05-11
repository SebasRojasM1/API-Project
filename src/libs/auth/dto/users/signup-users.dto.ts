import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './login-users.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
