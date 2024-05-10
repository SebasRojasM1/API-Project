import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();
    return bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
