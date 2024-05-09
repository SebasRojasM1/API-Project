import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class HashService {

    async compare(plainText: string, hashed: string): Promise<boolean>{
        return bcrypt.compare(plainText, hashed)
    }
    
}
