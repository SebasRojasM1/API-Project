import { userEntity } from "src/module/users/entities/users.entities";

export class RegisterUserDto{
    @Prop()
    @IsString()
    name?: string

    @Prop()
    @IsString()
    email: string

    @Prop()
    @IsString()
    password: string
}