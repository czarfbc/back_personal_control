import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashUtils {
  async generate_hash(data: string | Buffer): Promise<string> {
    const hash = await bcrypt.hash(data, 10);

    return hash;
  }

  async compare_hash(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(data, encrypted);

    return isMatch;
  }
}
