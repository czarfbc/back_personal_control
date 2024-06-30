import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashUtils {
  async generateHash(data: string | Buffer): Promise<string> {
    const hash = await bcrypt.hash(data, 10);

    return hash;
  }

  async compareHash(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(data, encrypted);

    return isMatch;
  }
}
